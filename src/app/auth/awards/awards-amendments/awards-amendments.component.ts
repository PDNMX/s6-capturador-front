import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-awards-amendments',
  templateUrl: './awards-amendments.component.html',
  styleUrls: ['./awards-amendments.component.css'],
})
export class AwardsAmendmentsComponent implements OnInit {
  @Input() amendmentsArray: Array<any> = [];
  @Output() addAmendment = new EventEmitter<any>();
  @Output() deleteAmendment = new EventEmitter<any>();
  record_id = '';

  amendmentsForm!: FormGroup;
  mostrarSpinner = false;
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute
  ) {}

  /* loadForm(data: any): void {
    data.forEach((amendment: any) => {
      this.addAmendment.emit(this.fb.group({ ...amendment }));
    });
  }

  loadData(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
    });

    this.api.getMethod(`/awards/${this.record_id}`).subscribe((d: any) => {
      const { awards, error, message } = d;
      if (error) {
        console.log('message', message);
      } else {
        if (awards !== null) this.loadForm(awards.amendments);
      }
    });
  } */

  ngOnInit(): void {
    this.initForm();
    //this.loadData();
  }

  get date(): FormControl {
    return this.amendmentsForm.get('date') as FormControl;
  }

  get rationale(): FormControl {
    return this.amendmentsForm.get('rationale') as FormControl;
  }

  get description(): FormControl {
    return this.amendmentsForm.get('description') as FormControl;
  }

  get amendsReleaseID(): FormControl {
    return this.amendmentsForm.get('amendsReleaseID') as FormControl;
  }

  get releaseID(): FormControl {
    return this.amendmentsForm.get('releaseID') as FormControl;
  }

  initForm(): void {
    this.amendmentsForm = this.fb.group({
      date: ['', Validators.required],
      rationale: ['', Validators.required],
      description: ['', Validators.required],
      amendsReleaseID: ['', Validators.required],
      releaseID: ['', Validators.required],
    });
  }

  addNewAmendment(): void {
    this.mostrarSpinner = true;
    this.addAmendment.emit(this.amendmentsForm);
    //console.log(this.amendmentsForm.value);
    this.initForm();
    setTimeout(() => {
      this.mostrarSpinner = false;
      console.log('agregando al arreglo');
    }, 1000);
  }
  confirmAndDeleteAmendment(index: number): void {
    Swal.fire({
      text: '¿Deseas eliminar esta modificación?',
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
        this.deleteAmendment.emit(index);
      }
    });
  }
}
