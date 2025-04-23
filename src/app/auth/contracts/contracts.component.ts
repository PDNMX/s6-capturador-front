import { Component, OnInit } from '@angular/core';
import { FormArray, Validators, FormBuilder, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css'],
})
export class ContractsComponent implements OnInit {
  record_id = null;
  editMode: boolean = false;

  contractsForm!: FormGroup;
  contractForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute
  ) {}

  get contractsArray() {
    return this.contractsForm.controls['contracts'] as FormArray;
  }

  addContract(): void {
    this.contractsArray.push(this.contractForm);
  }

  confirmAndDeleteContract(index: number): void {
    Swal.fire({
      text: '¿Deseas eliminar este contrato?',
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
        this.deleteContract(index);
      }
    });
  }

  deleteContract(index: number): void {
    this.contractsArray.removeAt(index);
    this.save();
    this.loadData();
  }

  get guaranteesArray() {
    return this.contractForm.controls['guarantees'] as FormArray;
  }

  addGuarante(opt: any): void {
    this.guaranteesArray.push(opt);
  }
  deleteGuarante(index: number): void {
    this.guaranteesArray.removeAt(index);
  }

  get documentsArray() {
    return this.contractForm.controls['documents'] as FormArray;
  }

  addDocument(opt: any): void {
    this.documentsArray.push(opt);
  }
  deleteDocuments(index: number): void {
    this.documentsArray.removeAt(index);
  }

  get milestonesArray() {
    return this.contractForm.controls['milestones'] as FormArray;
  }

  addMileston(opt: any): void {
    this.milestonesArray.push(opt);
  }
  deleteMileston(index: number): void {
    this.milestonesArray.removeAt(index);
  }

  get amendmentsArray() {
    return this.contractForm.controls['amendments'] as FormArray;
  }

  addAmendments(opt: any): void {
    this.amendmentsArray.push(opt);
  }
  deleteAmendments(index: number): void {
    this.amendmentsArray.removeAt(index);
  }

  get itemsArray() {
    return this.contractForm.controls['items'] as FormArray;
  }

  addItems(opt: any): void {
    this.itemsArray.push(opt);
  }
  deleteItems(index: number): void {
    this.itemsArray.removeAt(index);
  }

  get implementationForm() {
    return this.contractForm.controls['implementation'] as FormGroup;
  }

  loadForm(data: any): void {
    data.forEach((contract: any) => {
      this.contractsArray.push(this.fb.control(contract));
      this.contractForm.patchValue({
        ...contract,
        contractId: contract.id || '',
      });

      const { items, guarantees, documents } = contract;

      items.forEach((item: any) => {
        this.itemsArray.push(this.fb.control(item));
      });

      guarantees.forEach((guarante: any) => {
        this.guaranteesArray.push(this.fb.control(guarante));
      });

      documents.forEach((document: any) => {
        this.documentsArray.push(this.fb.control(document));
      });
    });
  }

  loadData(): void {
    this.api.getMethod(`/contracts/${this.record_id}`).subscribe((d: any) => {
      const { contracts, error, message } = d;
      console.log('contracts: ', contracts);

      if (error) {
        console.log('message: ', message);
      } else {
        // load forms
        if (contracts !== null) this.loadForm(contracts);
      }
    });
  }

  addNewContract(): void {
    this.editMode = true;
    this.initContractForm();
  }

  cancelContract(): void {
    this.editMode = false;
    this.initContractForm();
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
    });

    this.initForm();
    this.initContractForm();
    this.loadData();

    console.log('this.contractsForm: ', this.contractsForm.value);
  }

  initForm(): void {
    this.contractsForm = this.fb.group({
      contracts: this.fb.array([]),
    });
  }

  initContractForm(): void {
    this.contractForm = this.fb.group({
      contractId: ['', [Validators.required]],
      awardID: ['', [Validators.required]],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status: ['', [Validators.required]],
      period: this.fb.group({
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]],
        maxExtentDate: ['', [Validators.required]],
        durationInDays: ['', [Validators.required]],
      },{ validators: this.dateComparisonValidator() }),
      value: this.fb.group({
        amount: ["", [Validators.required]],
        netAmount: ["", [Validators.required]],
        currency: ['MXN', [Validators.required]],
        exchangeRates: this.fb.array([]),
      }),
      dateSigned: ['', [Validators.required]],
      surveillanceMechanisms: this.fb.array([]),
      items: this.fb.array([]),
      guarantees: this.fb.array([]),
      documents: this.fb.array([]),
      implementation: this.fb.group({
        status: ['', [Validators.required]],
        transactions: this.fb.array([]),
        milestones: this.fb.array([]),
        documents: this.fb.array([]),
      }),
      relatedProcesses: this.fb.array([]),
      milestones: this.fb.array([]),
      amendments: this.fb.array([]),
    });
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

  saveData(): void {
    const formValue = this.contractForm.value;
  
    const validImplementation = this.implementationForm.valid;
    const validDocuments = this.documentsArray.length > 0 && this.documentsArray.controls.every((d: any) => d.valid !== false);
    const validItems = this.itemsArray.length > 0 && this.itemsArray.controls.every((i: any) => i.valid !== false);
    const validGuarantees = this.guaranteesArray.length > 0 && this.guaranteesArray.controls.every((g: any) => g.valid !== false);
    const validAmendments = this.amendmentsArray.length > 0 && this.amendmentsArray.controls.every((a: any) => a.valid !== false);
    const validMilestones = this.milestonesArray.length > 0 && this.milestonesArray.controls.every((m: any) => m.valid !== false);
  
    const formCompletamenteValido = this.contractForm.valid &&
      validImplementation &&
      validDocuments &&
      validItems &&
      validGuarantees &&
      validAmendments &&
      validMilestones;
  
    if (!formCompletamenteValido) {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        text: 'Debes completar todos los campos requeridos: datos generales del contrato, articulos del contrato, garantías, documentos, ejecución, hitos y modificaciones.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#ffc107',
      });
  
      this.contractForm.markAllAsTouched();
      this.documentsArray.controls.forEach((ctrl: any) => ctrl.markAllAsTouched?.());
      this.itemsArray.controls.forEach((ctrl: any) => ctrl.markAllAsTouched?.());
      this.guaranteesArray.controls.forEach((ctrl: any) => ctrl.markAllAsTouched?.());
      this.amendmentsArray.controls.forEach((ctrl: any) => ctrl.markAllAsTouched?.());
      this.milestonesArray.controls.forEach((ctrl: any) => ctrl.markAllAsTouched?.());
      this.implementationForm.markAllAsTouched();
  
      return;
    }
  
    const contractData = {
      ...formValue,
      id: formValue.contractId,
    };
  
    this.contractsArray.push(this.fb.control(contractData));
    this.editMode = false;
    this.initContractForm();
  
    this.save();
    this.loadData();
  }
  

  save(): void {
    this.api
      .postMethod(
        { ...this.contractsForm.value },
        `/contracts/${this.record_id}`
      )
      .subscribe((r: any) => {
        console.log('r: ', r);
        if (r.err) {
          console.log('r: ', r);
        } else {
          this.initForm();
        }
      });
  }
}
