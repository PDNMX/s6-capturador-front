import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Currency, FormatDocument, getDocumentType, Language } from 'src/utils';
import Swal from 'sweetalert2';

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

  get project(): FormControl {
    return this.budgetForm.get('project') as FormControl;
  }

  get projectID(): FormControl {
    return this.budgetForm.get('projectID') as FormControl;
  }

  get description(): FormControl {
    return this.budgetForm.get('description') as FormControl;
  }

  get uri(): FormControl {
    return this.budgetForm.get('uri') as FormControl;
  }

  get amount(): FormControl {
    return this.budgetForm.get('value')?.get('amount') as FormControl;
  }

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
        if (planning !== null && planning.budget !== null)
          this.loadForm(planning.budget);
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
  confirmAndDeleteBudgetBreakdown(index: number): void {
    Swal.fire({
      text: '¿Realmente deseas eliminar este desglose presupuestario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          text: 'El registro ha sido eliminado.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        })
        this.deleteBudgetBreakdown(index);    
      }
    });
  }
  deleteBudgetBreakdown(index: number): void {
    this.budgetBreakdownArray.removeAt(index);
  }
}
