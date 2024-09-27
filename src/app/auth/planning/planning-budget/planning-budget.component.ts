import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

import { 
  Currency 
} from 'src/utils';

@Component({
  selector: 'app-planning-budget',
  templateUrl: './planning-budget.component.html',
  styleUrls: ['./planning-budget.component.css']
})
export class PlanningBudgetComponent implements OnInit{
  @Input() budgetArray: Array<any> = [];
  @Output() addBudget = new EventEmitter<any>();

  record_id: string = '';
  planningBudgetForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm  (): void {
    this.planningBudgetForm = this.fb.group({
      id: ['', Validators.required],
      projectID: ['', Validators.required],
      project: ['', Validators.required],
      description: ['', Validators.required],
      uri: ['', Validators.required],
      value: this.fb.group({
        amount: ['', Validators.required],
        currency: ['', Validators.required],
      }),
      budgetBreakdown: this.fb.array([]),
      period: this.fb.group({
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        maxExtentDate: ['', Validators.required],
        durationInDays: ['', Validators.required],
      }),
      sourceParty: this.fb.group({
        id: ['', Validators.required],
        name: ['', Validators.required],
      }),
    }); 
  }
}
