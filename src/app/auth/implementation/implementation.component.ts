import { getDocumentType } from 'src/utils';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { map, Observable, of, tap, catchError, throwError } from 'rxjs';
//import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Language } from 'src/utils';

@Component({
  selector: 'app-implementation',
  templateUrl: './implementation.component.html',
  styleUrls: ['./implementation.component.css'],
})
export class ImplementationComponent implements OnInit {
  implementationForm!: FormGroup;
  record_id: string = '';

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
  Submit() {
    console.log(this.implementationForm.value);
    this.api
      .postMethod(
        { ...this.implementationForm.value },
        `/implements/${this.record_id}`
      )
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
