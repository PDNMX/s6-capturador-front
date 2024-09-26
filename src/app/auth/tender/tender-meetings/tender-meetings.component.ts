import { map } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-tender-meetings',
  templateUrl: './tender-meetings.component.html',
  styleUrls: ['./tender-meetings.component.css'],
})
export class TenderMeetingsComponent implements OnInit {
  @Input() clarificationMeetingsArray: Array<any> = [];
  @Output() addClarificationMeeting = new EventEmitter<any>();
  @Output() deleteClarificationMeeting = new EventEmitter<any>();

  record_id = '';
  meetingsArray: Array<any> = [];

  meetingForm!: FormGroup;
  attendeesForm!: FormGroup;
  officialsForm!: FormGroup;

  attendees = [
    {
      id: 1,
      name: 'nombre 1',
    },
    {
      id: 2,
      name: 'nombre 2',
    },

    {
      id: 3,
      name: 'nombre 3',
    },
  ];

  officials = [
    {
      id: 1,
      name: 'nombre 1',
    },
    {
      id: 2,
      name: 'nombre 2',
    },

    {
      id: 3,
      name: 'nombre 3',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

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

  addAttendess(): void {
    const opt = this.attendeesForm.value.id;
    this.attendeesArray.push(this.fb.group({ ...opt }));
  }

  deleteAttendess(index: number): void {
    this.attendeesArray.removeAt(index);
  }

  addOfficials(): void {
    const opt = this.officialsForm.value.id;
    this.officialsArray.push(this.fb.group({ ...opt }));
  }

  deleteOfficials(index: number): void {
    this.officialsArray.removeAt(index);
  }

  addNewClarificationMeeting(): void {
    this.addClarificationMeeting.emit(this.meetingForm);
    this.initForm();
  }
}
