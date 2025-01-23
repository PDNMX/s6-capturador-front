import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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

  mostrarSpinner = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  get componentsArray() {
    return this.budgetLinesForm.controls['components'] as FormArray;
  }

  get description(): FormControl {
    return this.budgetBreakdownForm.get('description') as FormControl;
  }

  get uri(): FormControl {
    return this.budgetBreakdownForm.get('uri') as FormControl;
  }

  get amount(): FormControl {
    return this.budgetBreakdownForm.get('amount')?.get('amount') as FormControl;
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
        amount: [, [Validators.required, Validators.min(1)]],
        currency: ['MXN', [Validators.required]],
      }),
      period: this.fb.group({
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]],
        maxExtentDate: ['', [Validators.required]],
        durationInDays: [, [Validators.required]],
      }),
      budgetLines: this.fb.array([]),
      sourceParty: null,
    });

    this.initBudgetLinesForm();
    this.initComponentsForm();
  }

  get id(): FormControl {
    return this.budgetLinesForm.get('id') as FormControl;
  }

  get origin(): FormControl {
    return this.budgetLinesForm.get('origin') as FormControl;
  }

  initBudgetLinesForm(): void {
    this.budgetLinesForm = this.fb.group({
      id: ['', [Validators.required]],
      origin: ['', [Validators.required]],
      components: this.fb.array([]),
    });

    this.initComponentsForm();
  }

  get name(): FormControl {
    return this.componentsForm.get('name') as FormControl;
  }

  get level(): FormControl {
    return this.componentsForm.get('level') as FormControl;
  }

  get code(): FormControl {
    return this.componentsForm.get('code') as FormControl;
  }

  get comp_description(): FormControl {
    return this.componentsForm.get('description') as FormControl;
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
    this.mostrarSpinner = true;
    setTimeout(() => {
      this.mostrarSpinner = false;
      console.log('agregando al arreglo');
    }, 1000);
  }
}
