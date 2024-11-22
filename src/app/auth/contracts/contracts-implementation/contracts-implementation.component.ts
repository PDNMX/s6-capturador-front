import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ImplementationStatus } from 'src/utils';

@Component({
  selector: 'app-contracts-implementation',
  templateUrl: './contracts-implementation.component.html',
  styleUrls: ['./contracts-implementation.component.css'],
})
export class ContractsImplementationComponent implements OnInit {
  @Input() implementationForm!: FormGroup;

  record_id = null;
  implementationStatus = ImplementationStatus;

  object_implementation: any = {};

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

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
    return this.implementationForm.controls['milestones'] as FormArray;
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
  }

  getImplementationStatusDesc(code: string): string {
    let dec = '';
    this.implementationStatus.forEach((t) => {
      if (t.code === code) dec = t.description;
    });
    return dec;
  }
}
