import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tender',
  templateUrl: './tender.component.html',
  styleUrls: ['./tender.component.css'],
})
export class TenderComponent implements OnInit {
  tenderForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.tenderForm = this.fb.group({
      title: [''],
      additionalProcurementCategories: [''],
      awardCriteria: [''],
      awardCriteriaDetails: [''],
      awardPeriod: this.fb.group({
        durationInDays: [''],
        endDate: [''],
        maxExtentDate: [''],
        startDate: [''],
      }),
      contractPeriod: this.fb.group({
        durationInDays: [''],
        endDate: [''],
        maxExtentDate: [''],
        startDate: [''],
      }),
      description: [''],
      eligibilityCriteria: [''],
      enquiryPeriod: this.fb.group({
        durationInDays: [''],
        endDate: [''],
        maxExtentDate: [''],
        startDate: [''],
      }),
      hasEnquiries: [''],
      id: [''],
      mainProcurementCategory: [''],
      minValue: this.fb.group({
        amount: [''],
        currency: [''],
      }),
      numberOfTenderers: [''],
      procurementMethod: [''],
      procurementMethodDetails: [''],
      procurementMethodRationale: [''],
      procuringEntity: this.fb.group({
        id: [''],
        name: [''],
      }),
      status: [''],
      submissionMethod: [''],
      submissionMethodDetails: [''],
      tenderPeriod: this.fb.group({
        durationInDays: [''],
        endDate: [''],
        maxExtentDate: [''],
        startDate: [''],
      }),
      value: this.fb.group({
        amount: [''],
        currency: [''],
      }),
    });
  }

  onSubmit(): void {
    console.log(this.tenderForm.value);
  }
}
