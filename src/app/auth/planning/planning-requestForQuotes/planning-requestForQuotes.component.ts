import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

import { 
  Currency 
} from 'src/utils';

@Component({
  selector: 'app-planning-requestForQuotes',
  templateUrl: './planning-requestForQuotes.component.html',
  styleUrls: ['./planning-requestForQuotes.component.css']
})
export class PlanningRequestForQuotesComponent implements OnInit{
  @Input() requestForQuotesArray: Array<any> = [];

  @Output() addRequestForQuotes = new EventEmitter<any>();  

  record_id: string = '';
  planningRequestForQuotesForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm  (): void {
    this.planningRequestForQuotesForm = this.fb.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      period: this.fb.group({
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        maxExtentDate: ['', Validators.required],
        durationInDays: ['', Validators.required],
      }),
      items: this.fb.array([]),
      uri: ['', Validators.required],
    }); 
  }
}
