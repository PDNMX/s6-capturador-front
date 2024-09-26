import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tender-amendments',
  templateUrl: './tender-amendments.component.html',
  styleUrls: ['./tender-amendments.component.css'],
})
export class TenderAmendmentsComponent implements OnInit {
  @Input() amendmentsArray: Array<any> = [];
  @Output() addAmendment = new EventEmitter<any>();
  @Output() deleteAmendment = new EventEmitter<any>();

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

  addNewAmendment(): void {
    this.addAmendment.emit(this.amendmentsForm);
    this.initForm();
  }
}
