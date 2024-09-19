import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tender-meetings',
  templateUrl: './tender-meetings.component.html',
  styleUrls: ['./tender-meetings.component.css'],
})
export class TenderMeetingsComponent implements OnInit {
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

  constructor(private fb: FormBuilder) {}

  get attendeesArray() {
    return this.meetingForm.controls['attendees'] as FormArray;
  }

  get officialsArray() {
    return this.meetingForm.controls['officials'] as FormArray;
  }

  ngOnInit(): void {
    this.initForm();
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

  addMeeting(): void {
    this.meetingsArray.push({ ...this.meetingForm.value });
    this.initForm();
  }

  deleteMeeting(index: number): void {
    this.meetingsArray = this.meetingsArray.filter((m, i) => i !== index);
  }
}
