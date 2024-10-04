import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Currency, FormatDocument, getDocumentType, Language } from 'src/utils';

@Component({
  selector: 'app-planning-budget',
  templateUrl: './planning-budget.component.html',
  styleUrls: ['./planning-budget.component.css'],
})
export class PlanningBudgetComponent implements OnInit {
  @Input() budgetForm!: FormGroup;

  @Output() saveBudgetData = new EventEmitter<any>();

  record_id = null;
  currency = Currency;

  // budgetForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

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

    // budgetBreakdown.forEach((e: any) => {
    //   this.budgetBreakdownArray.push(this.fb.group(e));
    // });
  }

  // loadData(): void {
  //   this.route.paramMap.subscribe((params: any) => {
  //     this.record_id = params.get('id');
  //   });

  //   this.api.getMethod(`/planning/${this.record_id}`).subscribe((d: any) => {
  //     const { planning, error, message } = d;
  //     if (error) {
  //       console.log('message: ', message);
  //     } else {
  //       // load forms
  //       if (planning.budget !== null) this.loadForm(planning.budget);
  //       console.log("planning.budget: ", planning.budget);
  //     }
  //   });
  // }

  ngOnInit(): void {
    // this.initForm();
    // this.loadData();
  }

  // initForm(): void {
  // this.budgetForm = this.fb.group({
  //   description: ['description', [Validators.required]],
  //   value: this.fb.group({
  //     amount: ['0', [Validators.required]],
  //     currency: ['MXN', [Validators.required]],
  //   }),
  //   project: ['project', [Validators.required]],
  //   projectID: ['projectID', [Validators.required]],
  //   uri: ['uri', [Validators.required]],
  //   budgetBreakdown: this.fb.array([]),
  // });
  // }

  saveForm(): void {
    this.saveBudgetData.emit(this.budgetForm);
  }

  get budgetBreakdownArray() {
    return this.budgetForm.controls['budgetBreakdown'] as FormArray;
  }

  addBudgetBreakdown(opt: any): void {
    this.budgetBreakdownArray.push(opt);
  }
  deleteBudgetBreakdown(index: number): void {
    this.budgetBreakdownArray.removeAt(index);
  }
}
