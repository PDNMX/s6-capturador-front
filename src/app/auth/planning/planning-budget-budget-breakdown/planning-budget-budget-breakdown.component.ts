import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService, IPartieList } from 'src/app/services/api.service';
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

  record_id = null;
  sourceParty: any = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

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
    this.initBudgetLinesForm();
  }
  deleteBudgetLines(index: number) {
    this.budgetLinesArray.removeAt(index);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
    });

    if (this.record_id) {
      this.api.getPartiesByType(this.record_id).subscribe((d: IPartieList) => {
        this.sourceParty = d.data;
      });
    }

    this.initForm();
  }

  initForm(): void {
    this.budgetBreakdownForm = this.fb.group({
      description: ['', [Validators.required]],
      uri: ['', [Validators.required]],
      amount: this.fb.group({
        amount: ['0', [Validators.required]],
        currency: ['MXN', [Validators.required]],
      }),
      period: this.fb.group({
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]],
        maxExtentDate: ['', [Validators.required]],
        durationInDays: [0, [Validators.required]],
      }),
      budgetLines: this.fb.array([]),
      sourceParty: null,
    });

    this.initBudgetLinesForm();
    this.initComponentsForm();
  }

  initBudgetLinesForm(): void {
    this.budgetLinesForm = this.fb.group({
      id: ['', [Validators.required]],
      origin: ['', [Validators.required]],
      components: this.fb.array([]),
    });

    this.initComponentsForm();
  }

  initComponentsForm(): void {
    this.componentsForm = this.fb.group({
      name: ['', [Validators.required]],
      level: ['', [Validators.required]],
      code: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  addNewBudgetBreakdown(): void {
    this.addBudgetBreakdown.emit(this.budgetBreakdownForm);
    this.initForm();
  }
}
