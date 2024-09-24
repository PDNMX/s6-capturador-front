import { Component, OnInit } from '@angular/core';
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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  get additionalProcurementCategoriesArray() {
    return this.generalForm.controls[
      'additionalProcurementCategories'
    ] as FormArray;
  }

  initForm(): void {
    this.generalForm = this.fb.group({
      status: ['', [Validators.required]],
      title: ['title', [Validators.required]],
      description: ['description', [Validators.required]],
      procuringEntity: ['procuringEntity', [Validators.required]],
      procurementMethod: ['procurementMethod', [Validators.required]],
      procurementMethodDetails: [
        'procurementMethodDetails',
        [Validators.required],
      ],
      procurementMethodRationale: [
        'procurementMethodRationale',
        [Validators.required],
      ],
      mainProcurementCategory: [
        'mainProcurementCategory',
        [Validators.required],
      ],
      additionalProcurementCategories: this.fb.array([]),
      awardCriteria: ['awardCriteria', [Validators.required]],
      awardCriteriaDetails: ['awardCriteriaDetails', [Validators.required]],
      submissionMethod: ['awardCriteriaDetails', [Validators.required]],
      submissionMethodDetails: ['awardCriteriaDetails', [Validators.required]],
      tenderPeriod: this.fb.group({
        startDate: ['startDate', [Validators.required]],
        endDate: ['endDate', [Validators.required]],
        maxExtentDate: ['maxExtentDate', [Validators.required]],
        durationInDays: ['durationInDays', [Validators.required]],
      }),
      enquiryPeriod: this.fb.group({
        startDate: ['startDate', [Validators.required]],
        endDate: ['endDate', [Validators.required]],
        maxExtentDate: ['maxExtentDate', [Validators.required]],
        durationInDays: ['durationInDays', [Validators.required]],
      }),
      awardPeriod: this.fb.group({
        startDate: ['startDate', [Validators.required]],
        endDate: ['endDate', [Validators.required]],
        maxExtentDate: ['maxExtentDate', [Validators.required]],
        durationInDays: ['durationInDays', [Validators.required]],
      }),
      contractPeriod: this.fb.group({
        startDate: ['startDate', [Validators.required]],
        endDate: ['endDate', [Validators.required]],
        maxExtentDate: ['maxExtentDate', [Validators.required]],
        durationInDays: ['durationInDays', [Validators.required]],
      }),
    });

    this.additionalProcurementCategoriesForm = this.fb.group({
      data: ['', [Validators.required]],
    });
  }

  saveForm(): void {
    console.log(this.generalForm.value);
  }

  addAdditionalProcurementCategories(): void {
    const opt = this.additionalProcurementCategoriesForm.value.data;
    this.additionalProcurementCategoriesArray.push(this.fb.group({ ...opt }));
  }

  deleteAdditionalProcurementCategories(index: number): void {
    this.additionalProcurementCategoriesArray.removeAt(index);
  }
}
