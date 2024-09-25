import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tender',
  templateUrl: './tender.component.html',
  styleUrls: ['./tender.component.css'],
})
export class TenderComponent implements OnInit {
  tenderForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  get tenderersArray() {
    return this.tenderForm.controls['tenderers'] as FormArray;
  }

  addTenderer(opt: any): void {
    this.tenderersArray.push(this.fb.group({ ...opt }));
  }

  deleteTenderer(index: number): void {
    this.tenderersArray.removeAt(index);
  }

  get documentsArray() {
    return this.tenderForm.controls['documents'] as FormArray;
  }

  addDocument(opt: any): void {
    this.documentsArray.push(this.fb.group({ ...opt }));
  }

  deleteDocument(index: number): void {
    this.documentsArray.removeAt(index);
  }

  get milestonesArray() {
    return this.tenderForm.controls['milestones'] as FormArray;
  }

  addMilestone(opt: any): void {
    this.milestonesArray.push(this.fb.group({ ...opt }));
  }

  deleteMilestone(index: number): void {
    this.milestonesArray.removeAt(index);
  }

  get amendmentsArray() {
    return this.tenderForm.controls['amendments'] as FormArray;
  }

  addAmendment(opt: any): void {
    this.amendmentsArray.push(this.fb.group({ ...opt }));
  }

  deleteAmendment(index: number): void {
    this.amendmentsArray.removeAt(index);
  }

  get clarificationMeetingsArray() {
    return this.tenderForm.controls['clarificationMeetings'] as FormArray;
  }

  addClarificationMeeting(opt: any): void {
    this.clarificationMeetingsArray.push(
      this.fb.group({
        date: opt.date,
        attendees: opt.attendees,
        officials: opt.officials,
      })
    );
  }

  deleteClarificationMeeting(index: number): void {
    this.clarificationMeetingsArray.removeAt(index);
  }

  get itemsArray() {
    return this.tenderForm.controls['items'] as FormArray;
  }

  addItem(opt: any): void {
    this.itemsArray.push(this.fb.group({ ...opt }));
  }

  deleteItem(index: number): void {
    this.itemsArray.removeAt(index);
  }

  saveGeneralData(opt: any): void {
    this.tenderForm = this.fb.group({
      ...opt,
      ...this.tenderForm.controls,
    });
    // this.tenderForm.
  }

  ngOnInit(): void {
    this.tenderForm = this.fb.group({
      tenderers: this.fb.array([], [Validators.required]),
      documents: this.fb.array([], [Validators.required]),
      milestones: this.fb.array([], [Validators.required]),
      amendments: this.fb.array([], [Validators.required]),
      clarificationMeetings: this.fb.array([], [Validators.required]),
      items: this.fb.array([], [Validators.required]),
      // title: [''],
      // additionalProcurementCategories: [''],
      // awardCriteria: [''],
      // awardCriteriaDetails: [''],
      // awardPeriod: this.fb.group({
      //   durationInDays: [''],
      //   endDate: [''],
      //   maxExtentDate: [''],
      //   startDate: [''],
      // }),
      // contractPeriod: this.fb.group({
      //   durationInDays: [''],
      //   endDate: [''],
      //   maxExtentDate: [''],
      //   startDate: [''],
      // }),
      // description: [''],
      // eligibilityCriteria: [''],
      // enquiryPeriod: this.fb.group({
      //   durationInDays: [''],
      //   endDate: [''],
      //   maxExtentDate: [''],
      //   startDate: [''],
      // }),
      // hasEnquiries: [''],
      // id: [''],
      // mainProcurementCategory: [''],
      // minValue: this.fb.group({
      //   amount: [''],
      //   currency: [''],
      // }),
      // numberOfTenderers: [''],
      // procurementMethod: [''],
      // procurementMethodDetails: [''],
      // procurementMethodRationale: [''],
      // procuringEntity: this.fb.group({
      //   id: [''],
      //   name: [''],
      // }),
      // status: [''],
      // submissionMethod: [''],
      // submissionMethodDetails: [''],
      // tenderPeriod: this.fb.group({
      //   durationInDays: [''],
      //   endDate: [''],
      //   maxExtentDate: [''],
      //   startDate: [''],
      // }),
      // value: this.fb.group({
      //   amount: [''],
      //   currency: [''],
      // }),
    });
  }

  onSubmit(): void {
    console.log(this.tenderForm.value);
  }

  submit(): void {
    console.log(this.tenderForm.value);
  }
}
