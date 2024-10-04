import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Currency } from 'src/utils';

@Component({
  selector: 'app-planning-budget-budget-breakdown',
  templateUrl: './planning-budget-budget-breakdown.component.html',
  styleUrls: ['./planning-budget-budget-breakdown.component.css'],
})
export class PlanningBudgetBudgetBreakdownComponent implements OnInit {
  @Input() budgetBreakdownArray: Array<any> = [];
  @Output() addBudgetBreakdown = new EventEmitter<any>();
  @Output() deleteBudgetBreakdown = new EventEmitter<any>();

  currency = Currency;
  budgetBreakdownForm!: FormGroup;
  budgetLinesForm!: FormGroup;
  componentsForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  get componentsArray() {
    return this.budgetLinesForm.controls['components'] as FormArray;
  }

  addComponent(): void {
    this.componentsArray.push(this.componentsForm);
    let id: Array<string> = [];

    this.budgetLinesForm.value.components.forEach((c: any) => {
      id.push(c.code);
    });

    console.log('id: ', id);

    this.budgetLinesForm.patchValue({ id: id.join('-') });

    this.initComponentsForm();
  }
  deleteComponent(index: number): void {
    this.componentsArray.removeAt(index);
  }

  get budgetLinesArray() {
    return this.budgetBreakdownForm.controls['budgetLines'] as FormArray;
  }

  addBudgetLines() {
    this.budgetLinesArray.push(this.budgetLinesForm);
  }
  deleteBudgetLines(index: number) {
    this.budgetLinesArray.removeAt(index);
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.budgetBreakdownForm = this.fb.group({
      description: ['description', [Validators.required]],
      uri: ['URI', [Validators.required]],
      amount: this.fb.group({
        amount: ['0', [Validators.required]],
        currency: ['MXN', [Validators.required]],
      }),
      period: this.fb.group({
        startDate: ['2024-09-27', [Validators.required]],
        endDate: ['2024-09-28', [Validators.required]],
        maxExtentDate: ['2024-09-29', [Validators.required]],
        durationInDays: [10, [Validators.required]],
      }),
      budgetLines: this.fb.array([]),
      sourceParty: this.fb.group({
        id: ['', [Validators.required]],
        name: ['', [Validators.required]],
      }),
    });

    this.initBudgetLinesForm();
    this.initComponentsForm();
  }

  initBudgetLinesForm(): void {
    this.budgetLinesForm = this.fb.group({
      id: ['un id largo', [Validators.required]],
      origin: ['un origen', [Validators.required]],
      components: this.fb.array([]),
    });
  }

  initComponentsForm(): void {
    this.componentsForm = this.fb.group({
      name: ['name', [Validators.required]],
      level: ['level', [Validators.required]],
      code: ['code', [Validators.required]],
      description: ['description', [Validators.required]],
    });
  }

  addNewBudgetBreakdown(): void {
    this.addBudgetBreakdown.emit(this.budgetBreakdownForm);
    this.initForm();
  }
}
