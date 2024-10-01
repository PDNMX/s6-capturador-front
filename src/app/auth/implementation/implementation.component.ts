import { getDocumentType } from 'src/utils';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-implementation',
  templateUrl: './implementation.component.html',
  styleUrls: ['./implementation.component.css'],
})
export class ImplementationComponent implements OnInit {
  
  editMode: boolean = false;
  implementationForm!: FormGroup;
  
  record_id = 'null';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  newImplementation(): void {
    this.editMode = true;
  }

  get transactionsArray() {
    return this.implementationForm.controls['transactions'] as FormArray;
  }

  addTransaction(opt: any): void {
    this.transactionsArray.push(opt);
  }

  deleteTransaction(index: number): void {
    this.transactionsArray.removeAt(index);
  }

  get documentsArray() {
    return this.implementationForm.controls['documents'] as FormArray;
  }

  addDocument(opt: any): void {
    this.documentsArray.push(opt);
  }

  deleteDocument(index: number): void {
    this.documentsArray.removeAt(index);
  }

  get milestonesArray() {
    return this.implementationForm.controls['milestone'] as FormArray;
  }

  addMilestone(opt: any): void {
    this.milestonesArray.push(opt);
  }

  deleteMilestone(index: number): void {
    this.milestonesArray.removeAt(index);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
    });

    this.implementationForm = this.fb.group({
      transactions: this.fb.array([], [Validators.required]),
      milestone: this.fb.array([], [Validators.required]),
      documents: this.fb.array([], [Validators.required]),
    });
  }

  submit(): void {
    console.log(this.implementationForm.value);
  }
}
