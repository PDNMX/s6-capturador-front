import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AdditionalProcurementCategories,
  AwardCriteria,
  Currency,
  MainProcurementCategory,
  ProcurementMethod,
  SubmissionMethod,
  TenderStatus,
} from 'src/utils';

@Component({
  selector: 'app-tender-general',
  templateUrl: './tender-general.component.html',
  styleUrls: ['./tender-general.component.css'],
})
export class TenderGeneralComponent implements OnInit {
  @Output() saveGeneralData = new EventEmitter<any>();

  tenderStatus = TenderStatus;
  currency = Currency;
  procurementMethod = ProcurementMethod;
  mainProcurementCategory = MainProcurementCategory;
  additionalProcurementCategories = AdditionalProcurementCategories;

  awardCriteria = AwardCriteria;
  submissionMethod = SubmissionMethod;

  tempEntidadContratante = [
    {
      id: '1',
      name: 'Entidad contratante 1',
    },
    {
      id: '2',
      name: 'Entidad contratante 2',
    },
    {
      id: '3',
      name: 'Entidad contratante 3',
    },
  ];

  generalForm!: FormGroup;
  additionalProcurementCategoriesForm!: FormGroup;
  submissionMethodForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.generalForm = this.fb.group({
      status: ['', [Validators.required]],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      procuringEntity: ['', [Validators.required]],
      value: this.fb.group({
        amount: ['0', [Validators.required]],
        currency: ['MXN', [Validators.required]],
      }),
      minValue: this.fb.group({
        amount: ['0', [Validators.required]],
        currency: ['MXN', [Validators.required]],
      }),
      procurementMethod: ['', [Validators.required]],
      procurementMethodDetails: ['', [Validators.required]],
      procurementMethodRationale: ['', [Validators.required]],
      mainProcurementCategory: ['', [Validators.required]],
      additionalProcurementCategories: this.fb.array([]),
      awardCriteria: ['', [Validators.required]],
      awardCriteriaDetails: ['', [Validators.required]],
      submissionMethod: this.fb.array([]),
      submissionMethodDetails: ['', [Validators.required]],
      tenderPeriod: this.fb.group({
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]],
        maxExtentDate: ['', [Validators.required]],
        durationInDays: [0, [Validators.required]],
      }),
      enquiryPeriod: this.fb.group({
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]],
        maxExtentDate: ['', [Validators.required]],
        durationInDays: [0, [Validators.required]],
      }),
      hasEnquiries: [false, [Validators.required]],
      awardPeriod: this.fb.group({
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]],
        maxExtentDate: ['', [Validators.required]],
        durationInDays: [0, [Validators.required]],
      }),
      contractPeriod: this.fb.group({
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]],
        maxExtentDate: ['', [Validators.required]],
        durationInDays: [0, [Validators.required]],
      }),

      eligibilityCriteria: ['', [Validators.required]],
      numberOfTenderers: [0, [Validators.required]],
    });

    this.additionalProcurementCategoriesForm = this.fb.group({
      data: ['', [Validators.required]],
    });

    this.submissionMethodForm = this.fb.group({
      data: ['', [Validators.required]],
    });
  }

  saveForm(): void {
    this.saveGeneralData.emit(this.generalForm.controls);
  }

  get additionalProcurementCategoriesArray() {
    return this.generalForm.controls[
      'additionalProcurementCategories'
    ] as FormArray;
  }

  addAdditionalProcurementCategories(): void {
    const opt: string = this.additionalProcurementCategoriesForm.value.data;
    this.additionalProcurementCategoriesArray.push(this.fb.control(opt));
  }

  deleteAdditionalProcurementCategories(index: number): void {
    this.additionalProcurementCategoriesArray.removeAt(index);
  }

  get submissionMethodArray() {
    return this.generalForm.controls['submissionMethod'] as FormArray;
  }

  addSubmissionMethod(): void {
    const opt: string = this.submissionMethodForm.value.data;
    this.submissionMethodArray.push(this.fb.control(opt));
  }

  deleteSubmissionMethod(index: number): void {
    this.submissionMethodArray.removeAt(index);
  }

  // submissionMethod
  getTenderStatusDesc(code: string): string {
    let dec = '';
    this.tenderStatus.forEach((t) => {
      if (t.code === code) dec = t.description;
    });

    return dec;
  }

  getProcurementMethod(code: string): string {
    let dec = '';
    this.procurementMethod.forEach((t) => {
      if (t.code === code) dec = t.description;
    });

    return dec;
  }

  getMainProcurementCategory(code: string): string {
    let dec = '';
    this.mainProcurementCategory.forEach((t) => {
      if (t.code === code) dec = t.description;
    });

    return dec;
  }

  getAdditionalProcurementCategoriesDesc(code: string): string {
    let dec = '';
    this.additionalProcurementCategories.forEach((t) => {
      if (t.code === code) dec = t.description;
    });

    return dec;
  }

  getAdditionalProcurementCategoriesTitle(code: string): string {
    let dec = '';
    this.additionalProcurementCategories.forEach((t) => {
      if (t.code === code) dec = t.title;
    });

    return dec;
  }

  getSubmissionMethodDesc(code: string): string {
    let dec = '';
    this.submissionMethod.forEach((t) => {
      if (t.code === code) dec = t.description;
    });

    return dec;
  }

  getSubmissionMethodTitle(code: string): string {
    let dec = '';
    this.submissionMethod.forEach((t) => {
      if (t.code === code) dec = t.title;
    });

    return dec;
  }

  getAwardCriteriaDesc(code: string): string {
    let dec = '';
    this.awardCriteria.forEach((t) => {
      if (t.code === code) dec = t.description;
    });

    return dec;
  }
}
