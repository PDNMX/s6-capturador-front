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

  record_id = null;
  currency = Currency;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  loadForm(data: any): void {
    this.budgetForm.patchValue({ ...data });

    data.budgetBreakdown.forEach((e: any) => {
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
        if (planning.budget !== null) this.loadForm(planning.budget);
      }
    });
  }

  ngOnInit(): void {
    this.loadData();
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
