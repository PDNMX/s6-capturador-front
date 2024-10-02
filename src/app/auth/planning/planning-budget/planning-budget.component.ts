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
  @Output() saveBudgetData = new EventEmitter<any>();

  record_id: string = '';

  budgetForm!: FormGroup;
  budgetBreakdownForm!: FormGroup;
  budgetLinesForm!: FormGroup;
  budgetComponentsForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService
  ) { }

  setSelectValue(element: string, value: any): void {
    this.budgetForm.get(element)?.setValue(value);
  }

  loadForm(data: any): void {
    const {
      id,
      projectID,
      project,
      description,
      uri,
      value,
      budgetBreakdown,
      budgetLines,
      budgetComponents,
    } = data;

    this.budgetForm.patchValue({
      id,
      projectID,
      project,
      description,
      uri,
      value,
      budgetBreakdown,
      budgetLines,
      budgetComponents,
    });

    budgetBreakdown.forEach((e: any) => {
      this.budgetBreakdownArray.push(this.fb.group(e));
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
        if (planning !== null) this.loadForm(planning);
      }
    });
  } 

  ngOnInit(): void {
    this.initForm();
    this.loadData();
  }


  initBudgetBreakdownForm(): void {
    this.budgetBreakdownForm = this.fb.group({
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
  }  
  
  initBudgetLinesForm(): void {
    this.budgetLinesForm = this.fb.group({
      id: ['', Validators.required],
      origin: ['', Validators.required],
    });
  }

  initBudgetComponentsForm(): void {
    this.budgetComponentsForm = this.fb.group({
      name: ['', Validators.required],
      level: ['', Validators.required],
      code: ['', Validators.required],
      description: ['', Validators.required],
    }); 
  }   



  initForm  (): void {
    this.budgetForm = this.fb.group({
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
      budgetLines: this.fb.array([]),
      budgetComponents: this.fb.array([]),
    }); 
    this.initBudgetBreakdownForm();
    this.initBudgetLinesForm();
    this.initBudgetComponentsForm();
  }


  saveForm(): void {
    this.saveBudgetData.emit(this.budgetForm.controls);
  }
  



  get budgetBreakdownArray() {
    return this.budgetBreakdownForm.controls['budgetBreakdown'] as FormArray;
  }
  addBudgetBreakdown(): void {
    this.budgetBreakdownArray.push(this.budgetBreakdownForm);
    this.initBudgetBreakdownForm();
  }
  deleteBudgetBreakdown(index: number): void {
    this.budgetBreakdownArray.removeAt(index);
  }




  get budgetLinesArray() {
    return this.budgetLinesForm.controls['budgetLines'] as FormArray;
  }
  addBudgetLines(): void {
    this.budgetLinesArray.push(this.budgetLinesForm);
    this.initBudgetLinesForm();
  }
  deleteBudgetLines(index: number): void {
    this.budgetLinesArray.removeAt(index);
  }




  get budgetComponentsArray() {
    return this.budgetComponentsForm.controls['budgetComponents'] as FormArray;
  } 
  addBudgetComponent(): void {
    this.budgetComponentsArray.push(this.budgetComponentsForm);
    this.initBudgetComponentsForm();
  }
  deleteBudgetComponent(index: number): void {
    this.budgetComponentsArray.removeAt(index);
  } 









  

 

}
