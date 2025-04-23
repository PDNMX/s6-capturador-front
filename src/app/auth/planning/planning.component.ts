import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css'],
})
export class PlanningComponent implements OnInit {
  record_id = null;
  planningForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute
  ) {}

  get budgetForm() {
    return this.planningForm.controls['budget'] as FormGroup;
  }

  get budgetArray() {
    return this.planningForm.controls['budget'] as FormArray;
  }
  addBudget(opt: any): void {
    this.budgetArray.push(opt);
  }
  deleteBudget(index: number): void {
    this.budgetArray.removeAt(index);
  }

  get documentsArray() {
    return this.planningForm.controls['documents'] as FormArray;
  }
  addDocument(opt: any): void {
    this.documentsArray.push(opt);
  }
  deleteDocument(index: number): void {
    this.documentsArray.removeAt(index);
  }

  get requestForQuotesArray() {
    return this.planningForm.controls['requestForQuotes'] as FormArray;
  }
  addRequestForQuotes(opt: any): void {
    this.requestForQuotesArray.push(opt);
  }
  deleteRequestForQuotes(index: number): void {
    this.requestForQuotesArray.removeAt(index);
  }

  get itemsArray() {
    return this.planningForm.controls['items'] as FormArray;
  }
  addItems(opt: any): void {
    this.itemsArray.push(opt);
  }
  deleteItems(index: number): void {
    this.itemsArray.removeAt(index);
  }

  get milestonesArray() {
    return this.planningForm.controls['milestones'] as FormArray;
  }
  addMilestones(opt: any): void {
    this.milestonesArray.push(opt);
  }
  deleteMilestones(index: number): void {
    this.milestonesArray.removeAt(index);
  }

  saveGeneralData(opt: any): void {
    this.planningForm = this.fb.group({
      ...opt,
      ...this.planningForm.controls,
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
      console.log('planning id: ', this.record_id);
    });

    this.initForm();
  }

  initForm(): void {
    this.planningForm = this.fb.group({
      budget: this.fb.group({
        description: ['', [Validators.required]],
        value: this.fb.group({
          amount: [, [Validators.required, Validators.min(1)]],
          currency: ['MXN', [Validators.required]],
        }),
        project: ['', [Validators.required]],
        projectID: ['', [Validators.required]],
        uri: ['', [Validators.required]],
        budgetBreakdown: this.fb.array([]),
      }),
      documents: this.fb.array([], [Validators.required]),
      requestForQuotes: this.fb.array([], [Validators.required]),
      milestones: this.fb.array([], [Validators.required]),
    });
  }

  submit(): void {
    const budget = this.planningForm.get('budget') as FormGroup;
    const documents = this.documentsArray;
    const requestForQuotes = this.requestForQuotesArray;
    const milestones = this.milestonesArray;

    const validBudget = budget.valid;
    const validDocuments =
      documents.length > 0 && documents.controls.every((ctrl) => ctrl.valid);
    const validQuotes =
      requestForQuotes.length > 0 && requestForQuotes.controls.every((ctrl) => ctrl.valid);
    const validMilestones =
      milestones.length > 0 && milestones.controls.every((ctrl) => ctrl.valid);

    if (
      !this.planningForm.valid ||
      !validBudget ||
      !validDocuments ||
      !validQuotes ||
      !validMilestones
    ) {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        text: 'Debes completar toda la información: Presupuesto, , Solicitudes de Cotización, Documentos e Hitos.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#ffc107',
      });

      this.planningForm.markAllAsTouched();
      budget.markAllAsTouched();
      documents.controls.forEach((ctrl) => ctrl.markAllAsTouched());
      requestForQuotes.controls.forEach((ctrl) => ctrl.markAllAsTouched());
      milestones.controls.forEach((ctrl) => ctrl.markAllAsTouched());

      return;
    }

    // Todo válido, se guarda
    this.api
      .postMethod({ ...this.planningForm.value }, `/planning/${this.record_id}`)
      .subscribe((r: any) => {
        console.log('Respuesta del backend: ', r);
      });
  }
}

