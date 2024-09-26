import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-awards-amendments',
  templateUrl: './awards-amendments.component.html',
  styleUrls: ['./awards-amendments.component.css'],
})
export class AwardsAmendmentsComponent implements OnInit {
  amendmentsForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.amendmentsForm = this.fb.group({
      id: ['', Validators.required],
      date: ['', Validators.required],
      rationale: ['', Validators.required],
      description: ['', Validators.required],
      amendsReleaseID: ['', Validators.required],
      releaseID: ['', Validators.required],
    });
  }

  onSubmitAwardsAmendments() {
    console.log(this.amendmentsForm.value);
  }
}
