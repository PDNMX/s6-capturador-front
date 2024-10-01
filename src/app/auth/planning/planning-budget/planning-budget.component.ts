import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Currency, FormatDocument, getDocumentType, Language } from 'src/utils';


@Component({
  selector: 'app-planning-budget',
  templateUrl: './planning-budget.component.html',
  styleUrls: ['./planning-budget.component.css']
})
export class PlanningBudgetComponent implements OnInit{
  @Input() budgetArray: Array<any> = [];
  @Input() budgetBreakdownArray: Array<any> = [];
  @Input() planningBudgetLinesArray: Array<any> = [];
  @Input() planningBudgetComponentsArray: Array<any> = [];
  @Output() addBudget = new EventEmitter<any>();
  @Output() addBudgetBreakdown = new EventEmitter<any>();
  @Output() addBudgetLine = new EventEmitter<any>();
  @Output() addBudgetComponent = new EventEmitter<any>();
  @Output() addBudgetBreakdownLine = new EventEmitter<any>();
  @Output() addBudgetBreakdownComponent = new EventEmitter<any>();
  @Output() saveBudgetData = new EventEmitter<any>();

  record_id: string = '';
  planningBudgetForm!: FormGroup;
  planningBudgetBreakdownForm!: FormGroup;
  planningBudgetLinesForm!: FormGroup;
  planningBudgetComponentsForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadData();
  }

  loadForm(data: any): void {
    data.forEach((budget: any) => {
      this.addBudget.emit(this.fb.group({ ...budget }));
    });
  }

  
  loadData(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
    });
    
    this.api.getMethod(`/planning/${this.record_id}`).subscribe((d: any) => {
      const { planning, error, message } = d;
      
      if (error) {
        console.log('message: ', message);
      } else {
        // load forms
        if (planning !== null) this.loadForm(planning.budget);
      }
    });
  } 
  
  addNewBudget(): void {
    this.addBudget.emit(this.planningBudgetForm);
    this.initForm();
  }

  getBudgetBreakdownArray() {
    return this.planningBudgetBreakdownForm.controls['budgetBreakdown'] as FormArray;
  }
  addNewBudgetBreakdown(): void {
    this.addBudgetBreakdown.emit(this.planningBudgetBreakdownForm);
    this.initForm();
  }
  deleteBudgetBreakdown(index: number): void {
    //this.budgetBreakdownArray.removeAt(index);
  }


  getPlanningBudgetLinesArray() {
    return this.planningBudgetLinesForm.controls['planningBudgetLines'] as FormArray;
  }
  addNewPlanningBudgetLines(): void {
    this.addBudgetLine.emit(this.planningBudgetLinesForm);
    this.initForm();
  }
  deletePlanningBudgetLines(): void {
    //this.planningBudgetLinesArray.removeAt(index);
  } 
  addNewBudgetLine(): void {
    this.addBudgetLine.emit(this.planningBudgetLinesForm);
    this.initForm();
  }

  getPlanningBudgetComponentsArray() {
    return this.planningBudgetComponentsForm.controls['planningBudgetComponents'] as FormArray;
  }
  addNewBudgetComponent(): void {
    this.addBudgetComponent.emit(this.planningBudgetComponentsForm);
    this.initForm();
  }
  deletePlanningBudgetComponents(): void {
    //this.planningBudgetComponentsArray.removeAt(index);
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
    }); 

    this.planningBudgetBreakdownForm = this.fb.group({
      id: ['', Validators.required],
      description: ['', Validators.required],
      uri: ['', Validators.required],
      amount: this.fb.group({
        amount: ['', Validators.required],
        currency: ['', Validators.required],
      }),
      period: this.fb.group({
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        maxExtentDate: ['', Validators.required],
        durationInDays: ['', Validators.required],
      }),
      budgetLines: this.fb.array([]),
      components: this.fb.array([]),
      sourceParty: this.fb.group({
        id: ['', Validators.required],
        name: ['', Validators.required],
      }),
    });

    this.planningBudgetLinesForm = this.fb.group({
      id: ['', Validators.required],
      origin: ['', Validators.required],
    });

    this.planningBudgetComponentsForm = this.fb.group({
      name: ['', Validators.required],
      level: ['', Validators.required],
      code: ['', Validators.required],
      description: ['', Validators.required],
    }); 
  }

  saveForm(): void {
    this.saveBudgetData.emit(this.planningBudgetForm.controls);
  }

}
