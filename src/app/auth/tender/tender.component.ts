import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-tender',
  templateUrl: './tender.component.html',
  styleUrls: ['./tender.component.css'],
})

export class TenderComponent implements OnInit {
  record_id = null;
  tenderForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute
  ) {}

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
    this.documentsArray.push(opt);
  }

  deleteDocument(index: number): void {
    this.documentsArray.removeAt(index);
  }

  get milestonesArray() {
    return this.tenderForm.controls['milestones'] as FormArray;
  }

  addMilestone(opt: any): void {
    this.milestonesArray.push(opt);
  }

  deleteMilestone(index: number): void {
    this.milestonesArray.removeAt(index);
  }

  get amendmentsArray() {
    return this.tenderForm.controls['amendments'] as FormArray;
  }

  addAmendment(opt: any): void {
    this.amendmentsArray.push(opt);
  }

  deleteAmendment(index: number): void {
    this.amendmentsArray.removeAt(index);
  }

  get clarificationMeetingsArray() {
    return this.tenderForm.controls['clarificationMeetings'] as FormArray;
  }

  addClarificationMeeting(opt: any): void {
    this.clarificationMeetingsArray.push(opt);
  }

  deleteClarificationMeeting(index: number): void {
    this.clarificationMeetingsArray.removeAt(index);
  }

  get itemsArray() {
    return this.tenderForm.controls['items'] as FormArray;
  }

  addItem(opt: any): void {
    this.itemsArray.push(opt);
  }

  deleteItem(index: number): void {
    this.itemsArray.removeAt(index);
  }

  saveGeneralData(opt: any): void {
    this.tenderForm = this.fb.group({
      ...opt,
      ...this.tenderForm.controls,
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
    });

    this.tenderForm = this.fb.group({
      tenderers: this.fb.array([], [Validators.required]),
      documents: this.fb.array([], [Validators.required]),
      milestones: this.fb.array([], [Validators.required]),
      amendments: this.fb.array([], [Validators.required]),
      clarificationMeetings: this.fb.array([], [Validators.required]),
      items: this.fb.array([], [Validators.required]),
    });
  }

  submit(): void {
    // console.log(this.tenderForm.value);

    this.api
      .postMethod({ ...this.tenderForm.value }, `/tender/${this.record_id}`)
      .subscribe((r: any) => {
        console.log('r: ', r);
        if (r.err) {
          console.log('r: ', r);
        } else {
          // const id = r.data._id;
          // console.log('id: ', id);
          // this.router.navigate([`/planning/${id}`]);
        }
      });
  }
}
