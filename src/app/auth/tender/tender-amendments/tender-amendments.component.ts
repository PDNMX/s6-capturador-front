import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tender-amendments',
  templateUrl: './tender-amendments.component.html',
  styleUrls: ['./tender-amendments.component.css'],
})
export class TenderAmendmentsComponent implements OnInit {
  amendmentsArray: Array<any> = [];
  amendmentsForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.amendmentsForm = this.fb.group({
      date: ['', [Validators.required]],
      rationale: ['', [Validators.required]],
      description: ['', [Validators.required]],
      amendsReleaseID: ['', [Validators.required]],
      releaseID: ['', [Validators.required]],
    });
  }

  addAmendments(): void {
    this.amendmentsArray.push(this.amendmentsForm.value);
    this.initForm();
  }

  deleteAmendments(index: number): void {
    this.amendmentsArray = this.amendmentsArray.filter((a, i) => i !== index);
  }
}
