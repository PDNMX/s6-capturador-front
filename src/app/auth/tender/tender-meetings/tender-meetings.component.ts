import { map } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService, IPartieList } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tender-meetings',
  templateUrl: './tender-meetings.component.html',
  styleUrls: ['./tender-meetings.component.css'],
})
export class TenderMeetingsComponent implements OnInit {
  @Input() clarificationMeetingsArray: Array<any> = [];
  @Output() addClarificationMeeting = new EventEmitter<any>();
  @Output() deleteClarificationMeeting = new EventEmitter<any>();

  record_id = null;
  meetingsArray: Array<any> = [];

  meetingForm!: FormGroup;
  attendeesForm!: FormGroup;
  officialsForm!: FormGroup;

  attendees: any = [];

  officials: any = [];
  mostrarSpinner = false;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  getPartiesListTitle(roles: Array<string>): string {
    return this.api.getPartiesListTitle(roles);
  }

  get attendeesArray() {
    return this.meetingForm.controls['attendees'] as FormArray;
  }

  get officialsArray() {
    return this.meetingForm.controls['officials'] as FormArray;
  }

  loadForm(data: any): void {
    data.forEach((meeting: any) => {
      const { id, date, attendees, officials } = meeting;

      this.addClarificationMeeting.emit(
        this.fb.group({
          id,
          date,
          attendees: this.fb.array(
            attendees.map((a: any) => this.fb.group({ ...a }))
          ),
          officials: this.fb.array(
            officials.map((a: any) => this.fb.group({ ...a }))
          ),
        })
      );
    });
  }

  loadData(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
    });

    this.api.getMethod(`/tender/${this.record_id}`).subscribe((d: any) => {
      const { tender, error, message } = d;

      if (error) {
        console.log('message: ', message);
      } else {
        // load forms
        if (tender !== null) this.loadForm(tender.clarificationMeetings);
      }
    });
  }

  ngOnInit(): void {
    this.initForm();

    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
    });

    if (this.record_id) {
      this.api.getPartiesByType(this.record_id).subscribe((d: IPartieList) => {
        this.attendees = d.data;
      });
    }

    if (this.record_id) {
      this.api.getPartiesByType(this.record_id).subscribe((d: IPartieList) => {
        this.officials = d.data;
      });
    }

    this.loadData();
  }

  initForm() {
    this.meetingForm = this.fb.group({
      date: ['', [Validators.required]],
      attendees: this.fb.array([], [Validators.required]),
      officials: this.fb.array([], [Validators.required]),
    });

    this.attendeesForm = this.fb.group({
      id: [null, [Validators.required]],
    });

    this.officialsForm = this.fb.group({
      id: [null, [Validators.required]],
    });
  }

  get date() {
    return this.meetingForm.get('date') as FormControl;
  }

  addAttendess(): void {
    if (this.attendees.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'Sin asistentes',
        text: 'No existen asistentes registrados en la sección de "Actores".',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#0d6efd',
      });
      return;
    }
    if (!this.attendeesForm.value.id) { 
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe seleccionar un asistente para agregarlo.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#dc3545',
      });
      return;
    }
    const opt = this.attendeesForm.value.id;
    this.attendeesArray.push(this.fb.group({ ...opt }));
    this.attendeesForm.reset();
  }

  deleteAttendess(index: number): void {
    this.attendeesArray.removeAt(index);
  }

  addOfficials(): void {
    if (this.officials.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'Sin servidores públicos',
        text: 'No existen servidores públicos registrados en la sección de "Actores".',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#0d6efd',
      });
      return;
    }
    if (!this.officialsForm.value.id) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe seleccionar un servidor público para agregarlo.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#dc3545',
      });
      return;
    }
    const opt = this.officialsForm.value.id;
    this.officialsArray.push(this.fb.group({ ...opt }));
    this.officialsForm.reset();
  }

  deleteOfficials(index: number): void {
    this.officialsArray.removeAt(index);
  }

  enableAddClarificationMeetingButton(): boolean {
    return this.meetingForm.valid;
  }

  addNewClarificationMeeting(): void {
    this.mostrarSpinner = true;
    this.addClarificationMeeting.emit(this.meetingForm);
    this.initForm();
    setTimeout(() => {
      this.mostrarSpinner = false;
      console.log('agregando al arreglo');
    }, 1000);
  }
  confirmAndDeleteClarificationMeeting(index: number): void {
    Swal.fire({
      text: '¿Deseas eliminar este evento?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          text: 'El registro ha sido eliminado.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        })
        this.deleteClarificationMeeting.emit(index);
      }
    });
  }
}
