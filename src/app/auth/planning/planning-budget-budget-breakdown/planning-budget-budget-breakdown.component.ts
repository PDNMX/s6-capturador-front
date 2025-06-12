import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService, IPartieList } from 'src/app/services/api.service';
import { Currency } from 'src/utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-planning-budget-budget-breakdown',
  templateUrl: './planning-budget-budget-breakdown.component.html',
  styleUrls: ['./planning-budget-budget-breakdown.component.css'],
})
export class PlanningBudgetBudgetBreakdownComponent implements OnInit {
  @Input() budgetBreakdownArray: Array<any> = [];
  @Output() addBudgetBreakdown = new EventEmitter<any>();
  @Output() confirmAndDeleteBudgetBreakdown = new EventEmitter<any>();

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

  getPartiesListTitle(roles: Array<string>): string {
    return this.api.getPartiesListTitle(roles);
  }

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

  get period() {
    return this.budgetBreakdownForm.get('period') as FormGroup;
  }
  getControl(name: string): FormControl {
    return this.period.get(name) as FormControl;
  }

  private dateComparisonValidator(): Validators {
    return (group: AbstractControl): ValidationErrors | null => {
      const startDate = group.get('startDate')?.value;
      const endDate = group.get('endDate')?.value;
      const maxExtentDate = group.get('maxExtentDate')?.value;

      if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
        group.get('endDate')?.setErrors({ dateInvalid: true });
        return { dateInvalid: true };
      }

      if (
        maxExtentDate &&
        endDate &&
        new Date(maxExtentDate) < new Date(endDate)
      ) {
        group.get('maxExtentDate')?.setErrors({ maxDateInvalid: true });
        return { maxDateInvalid: true };
      }

      return null;
    };
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
  confirmAndDeleteBudgetLines(index: number) {
    Swal.fire({
      text: '¿Deseas eliminar esta línea presupuestaria?',
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
        this.deleteBudgetLines(index);
      }
    });
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
      description: [null],
      uri: [null],
      amount: this.fb.group({
        amount: [null],
        currency: ['MXN'],
      }),
      period: this.fb.group({
        startDate: [null],
        endDate: [null],
        maxExtentDate: [null],
        durationInDays: [null],
      }, { validators: this.dateComparisonValidator() }),
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
      id: [''],
      origin: [''],
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
      name: [''],
      level: [''],
      code: [''],
      description: [''],
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
