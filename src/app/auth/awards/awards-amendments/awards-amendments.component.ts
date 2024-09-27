import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-awards-amendments',
  templateUrl: './awards-amendments.component.html',
  styleUrls: ['./awards-amendments.component.css'],
})
export class AwardsAmendmentsComponent implements OnInit {
  @Input() amendmentsArray: Array<any> = [];
  @Output() addAmendment = new EventEmitter<any>();
  @Output() deleteAmendment = new EventEmitter<any>();

  amendmentsForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  loadForm(data: any): void {
    data.forEach((amendment: any) => {
      this.addAmendment.emit(this.fb.group({ ...amendment }));
    });
  }

  ngOnInit(): void {
    this.initForm();
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
    this.addAmendment.emit(this.amendmentsForm);
    console.log(this.amendmentsForm.value);
    this.initForm();
  }
}
