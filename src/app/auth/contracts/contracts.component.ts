import { Component, OnInit } from '@angular/core';
import { FormArray, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css'],
})
export class ContractsComponent implements OnInit {
  record_id = null;
  editMode: boolean = false;

  contractsForm!: FormGroup;
  contractForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

  get contractsArray() {
    return this.contractsForm.controls['contracts'] as FormArray;
  }

  addContract(): void {
    this.contractsArray.push(this.contractForm);
  }

  deleteContract(index: number): void {
    this.contractsArray.removeAt(index);
  }

  get guaranteesArray() {
    return this.contractForm.controls['guarantees'] as FormArray;
  }

  addGuarante(opt: any): void {
    this.guaranteesArray.push(opt);
  }
  deleteGuarante(index: number): void {
    this.guaranteesArray.removeAt(index);
  }

  get documentsArray() {
    return this.contractForm.controls['documents'] as FormArray;
  }

  addDocument(opt: any): void {
    this.documentsArray.push(opt);
  }
  deleteDocuments(index: number): void {
    this.documentsArray.removeAt(index);
  }

  get milestonesArray() {
    return this.contractForm.controls['milestones'] as FormArray;
  }

  addMileston(opt: any): void {
    this.milestonesArray.push(opt);
  }
  deleteMileston(index: number): void {
    this.milestonesArray.removeAt(index);
  }

  get amendmentsArray() {
    return this.contractForm.controls['amendments'] as FormArray;
  }

  addAmendments(opt: any): void {
    this.amendmentsArray.push(opt);
  }
  deleteAmendments(index: number): void {
    this.amendmentsArray.removeAt(index);
  }

  get itemsArray() {
    return this.contractForm.controls['items'] as FormArray;
  }

  addItems(opt: any): void {
    this.itemsArray.push(opt);
  }
  deleteItems(index: number): void {
    this.itemsArray.removeAt(index);
  }

  get implementationForm() {
    return this.contractForm.controls['implementation'] as FormGroup;
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
    });

    this.initForm();
    this.initContractForm();
  }

  initForm(): void {
    this.contractsForm = this.fb.group({
      contracts: this.fb.array([]),
    });
  }

  initContractForm(): void {
    this.contractForm = this.fb.group({
      id: ['id', [Validators.required]],
      awardID: ['awardID', [Validators.required]],
      title: ['title', [Validators.required]],
      description: ['description', [Validators.required]],
      status: ['pending', [Validators.required]],
      period: this.fb.group({
        startDate: ['startDate', [Validators.required]],
        endDate: ['endDate', [Validators.required]],
        maxExtentDate: ['maxExtentDate', [Validators.required]],
        durationInDays: ['durationInDays', [Validators.required]],
      }),
      value: this.fb.group({
        amount: [0, [Validators.required]],
        amountNet: [0, [Validators.required]],
        currency: ['MXN', [Validators.required]],
        exchangeRates: this.fb.array([]),
      }),
      dateSigned: ['dateSigned', [Validators.required]],
      surveillanceMechanisms: this.fb.array([]),
      items: this.fb.array([]),
      guarantees: this.fb.array([]),
      documents: this.fb.array([]),
      implementation: this.fb.group({
        status: ['pending', [Validators.required]],
        transactions: this.fb.array([]),
        milestones: this.fb.array([]),
        documents: this.fb.array([]),
      }),
      relatedProcesses: this.fb.array([]),
      milestones: this.fb.array([]),
      amendments: this.fb.array([]),
    });
  }

  saveData(): void {
    console.log('this.contractForm.value: ', this.contractForm.value);

    this.contractsArray.push(this.contractForm);
    this.initContractForm();

    console.log('this.contractsForm.value: ', this.contractsForm.value);

    this.api
      .postMethod(
        { ...this.contractsForm.value },
        `/contracts/${this.record_id}`
      )
      .subscribe((r: any) => {
        console.log('r: ', r);
        if (r.err) {
          console.log('r: ', r);
        } else {
          this.initForm();
        }
      });
  }
}
