import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  Validators,
  FormBuilder,
  FormGroup,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
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

  // Propiedades para manejar errores de validación
  validationErrors: string[] = [];
  sectionsWithErrors: { [key: string]: boolean } = {};

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
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          text: 'El registro ha sido eliminado.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
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
    this.clearSectionError('documents');
  }

  // Métodos para sub-componentes de implementación
  addImplementationTransaction(opt: any): void {
    const implementationTransactions = this.implementationForm.get(
      'transactions'
    ) as FormArray;
    implementationTransactions.push(opt);
    this.clearSectionError('implementation');
  }

  addImplementationDocument(opt: any): void {
    const implementationDocuments = this.implementationForm.get(
      'documents'
    ) as FormArray;
    implementationDocuments.push(opt);
    this.clearSectionError('implementation');
  }

  addImplementationMilestone(opt: any): void {
    const implementationMilestones = this.implementationForm.get(
      'milestones'
    ) as FormArray;
    implementationMilestones.push(opt);
    this.clearSectionError('implementation');
  }
  deleteDocuments(index: number): void {
    this.documentsArray.removeAt(index);
  }

  get milestonesArray() {
    return this.contractForm.controls['milestones'] as FormArray;
  }

  addMileston(opt: any): void {
    this.milestonesArray.push(opt);
    this.clearSectionError('milestones');
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

  saveGeneralDataForm(data: any): void {
    // Mergear los datos como lo hace awards.component.ts
    this.contractForm = this.fb.group({
      ...this.contractForm.controls,
      ...data,
    });

    // Limpiar el error de la sección general
    this.clearSectionError('general');
    console.log('Datos generales actualizados en el padre');
  }

  get itemsArray() {
    return this.contractForm.controls['items'] as FormArray;
  }

  addItems(opt: any): void {
    this.itemsArray.push(opt);
    this.clearSectionError('items');
  }
  deleteItems(index: number): void {
    this.itemsArray.removeAt(index);
  }

  get implementationForm() {
    return this.contractForm.controls['implementation'] as FormGroup;
  }

  validateRequiredSections(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    this.sectionsWithErrors = {};

    // Validar Datos generales del contrato
    const requiredGeneralFields = [
      'contractId',
      'awardID',
      'title',
      'description',
      'status',
      'dateSigned',
    ];
    const hasGeneralData = requiredGeneralFields.every((field) => {
      const control = this.contractForm.get(field);
      return control && control.value && control.value.toString().trim() !== '';
    });

    // Verificar grupos anidados de datos generales
    const periodGroup = this.contractForm.get('period');
    const hasPeriodData =
      periodGroup &&
      periodGroup.get('startDate')?.value &&
      periodGroup.get('endDate')?.value;

    const valueGroup = this.contractForm.get('value');
    const hasValueData =
      valueGroup &&
      valueGroup.get('amount')?.value &&
      valueGroup.get('currency')?.value;

    if (!hasGeneralData || !hasPeriodData || !hasValueData) {
      errors.push('Datos generales del contrato');
      this.sectionsWithErrors['general'] = true;
    }

    // Validar Artículos del contrato (obligatorio)
    const items = this.itemsArray;
    const validItems =
      items.length > 0 && items.controls.every((ctrl) => ctrl.valid);
    if (!validItems) {
      errors.push('Articulos del contrato');
      this.sectionsWithErrors['items'] = true;
    }

    // Validar Documentos (obligatorio)
    const documents = this.documentsArray;
    const validDocuments =
      documents.length > 0 && documents.controls.every((ctrl) => ctrl.valid);
    if (!validDocuments) {
      errors.push('Documentos');
      this.sectionsWithErrors['documents'] = true;
    }

    // Validar Ejecución (obligatorio) - Incluyendo sub-componentes
    const implementation = this.implementationForm;
    let implementationValid = true;
    let implementationErrors: string[] = [];

    // Validar status de implementación
    const implementationStatus = implementation.get('status');
    if (
      !implementationStatus?.value ||
      implementationStatus.value.toString().trim() === ''
    ) {
      implementationValid = false;
      implementationErrors.push('estado de implementación');
    }

    // Validar transacciones de implementación (obligatorio)
    const implementationTransactions = implementation.get(
      'transactions'
    ) as FormArray;
    const validImplementationTransactions =
      implementationTransactions.length > 0 &&
      implementationTransactions.controls.every((ctrl) => ctrl.valid);
    if (!validImplementationTransactions) {
      implementationValid = false;
      implementationErrors.push('transacciones');
    }

    // Validar documentos de implementación (obligatorio)
    const implementationDocuments = implementation.get(
      'documents'
    ) as FormArray;
    const validImplementationDocuments =
      implementationDocuments.length > 0 &&
      implementationDocuments.controls.every((ctrl) => ctrl.valid);
    if (!validImplementationDocuments) {
      implementationValid = false;
      implementationErrors.push('documentos de ejecución');
    }

    // Validar hitos de implementación (obligatorio)
    const implementationMilestones = implementation.get(
      'milestones'
    ) as FormArray;
    const validImplementationMilestones =
      implementationMilestones.length > 0 &&
      implementationMilestones.controls.every((ctrl) => ctrl.valid);
    if (!validImplementationMilestones) {
      implementationValid = false;
      implementationErrors.push('hitos de ejecución');
    }

    if (!implementationValid) {
      if (implementationErrors.length === 1) {
        errors.push(`Ejecución (falta: ${implementationErrors[0]})`);
      } else {
        errors.push(`Ejecución (faltan: ${implementationErrors.join(', ')})`);
      }
      this.sectionsWithErrors['implementation'] = true;
    }

    // Validar Hitos principales (obligatorio)
    const milestones = this.milestonesArray;
    const validMilestones =
      milestones.length > 0 && milestones.controls.every((ctrl) => ctrl.valid);
    if (!validMilestones) {
      errors.push('Hitos');
      this.sectionsWithErrors['milestones'] = true;
    }

    // NO validamos: Garantías y Modificaciones (son opcionales)

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  clearSectionError(section: string): void {
    if (this.sectionsWithErrors[section]) {
      delete this.sectionsWithErrors[section];
      this.validationErrors = this.validationErrors.filter((error) => {
        const sectionNames: { [key: string]: string } = {
          general: 'Datos generales del contrato',
          items: 'Articulos del contrato',
          documents: 'Documentos',
          implementation: 'Ejecución',
          milestones: 'Hitos',
        };
        return error !== sectionNames[section];
      });
    }
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
    // Limpiar errores al cancelar
    this.validationErrors = [];
    this.sectionsWithErrors = {};
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
      period: this.fb.group(
        {
          startDate: ['', [Validators.required]],
          endDate: ['', [Validators.required]],
          maxExtentDate: [null],
          durationInDays: [null],
        },
        { validators: this.dateComparisonValidator() }
      ),
      value: this.fb.group({
        amount: ['', [Validators.required]],
        netAmount: [null],
        currency: ['MXN', [Validators.required]],
        exchangeRates: this.fb.array([]),
      }),
      dateSigned: ['', [Validators.required]],
      surveillanceMechanisms: this.fb.array([]),
      items: this.fb.array([], [Validators.required]),
      guarantees: this.fb.array([]), // Sin validación requerida
      documents: this.fb.array([], [Validators.required]),
      implementation: this.fb.group({
        status: ['', [Validators.required]],
        transactions: this.fb.array([], [Validators.required]),
        milestones: this.fb.array([], [Validators.required]),
        documents: this.fb.array([], [Validators.required]),
      }),
      relatedProcesses: this.fb.array([]),
      milestones: this.fb.array([], [Validators.required]),
      amendments: this.fb.array([]), // Sin validación requerida
    });

    // Suscribirse a cambios en los campos principales para limpiar errores
    this.setupGeneralFormSubscriptions();
  }

  setupGeneralFormSubscriptions(): void {
    // Campos principales
    const mainFields = [
      'contractId',
      'awardID',
      'title',
      'description',
      'status',
      'dateSigned',
    ];
    mainFields.forEach((field) => {
      this.contractForm.get(field)?.valueChanges.subscribe((value) => {
        if (value && value.toString().trim() !== '') {
          this.clearSectionError('general');
        }
      });
    });

    // Campos del grupo period
    const periodGroup = this.contractForm.get('period');
    const periodFields = [
      'startDate',
      'endDate',
      'maxExtentDate',
      'durationInDays',
    ];
    periodFields.forEach((field) => {
      periodGroup?.get(field)?.valueChanges.subscribe((value) => {
        if (value && value.toString().trim() !== '') {
          this.clearSectionError('general');
        }
      });
    });

    // Campos del grupo value
    const valueGroup = this.contractForm.get('value');
    const valueFields = ['amount', 'netAmount', 'currency'];
    valueFields.forEach((field) => {
      valueGroup?.get(field)?.valueChanges.subscribe((value) => {
        if (value && value.toString().trim() !== '') {
          this.clearSectionError('general');
        }
      });
    });

    // Campo status de implementation
    const implementationGroup = this.contractForm.get('implementation');
    implementationGroup?.get('status')?.valueChanges.subscribe((value) => {
      if (value && value.toString().trim() !== '') {
        this.clearSectionError('implementation');
      }
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
    // Limpiar errores previos
    this.validationErrors = [];
    this.sectionsWithErrors = {};

    // Validar solo las secciones requeridas
    const validation = this.validateRequiredSections();

    if (!validation.isValid) {
      this.validationErrors = validation.errors;
      
      const errorsList = validation.errors
        .map((error) => `• ${error}`)
        .join('<br>');

      const htmlContent = `
        <div style="text-align: left;">
          <strong style="color: #dc3545;">Secciones pendientes:</strong><br><br>
          <div style="color: #dc3545;">${errorsList}</div>
        </div>
      `;

      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        html: htmlContent,
        footer: 'Revisa cada pestaña y asegúrate de completar todos los campos obligatorios.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#ffc107',
      });

      // Marcar como touched solo las secciones con errores
      if (this.sectionsWithErrors['general']) {
        this.contractForm.markAllAsTouched();
      }
      if (this.sectionsWithErrors['items']) {
        this.itemsArray.controls.forEach((ctrl) => ctrl.markAllAsTouched());
      }
      if (this.sectionsWithErrors['documents']) {
        this.documentsArray.controls.forEach((ctrl) => ctrl.markAllAsTouched());
      }
      if (this.sectionsWithErrors['implementation']) {
        this.implementationForm.markAllAsTouched();
      }
      if (this.sectionsWithErrors['milestones']) {
        this.milestonesArray.controls.forEach((ctrl) =>
          ctrl.markAllAsTouched()
        );
      }

      return;
    }

    // Todo válido, proceder con el guardado
    const formValue = this.contractForm.value;

    const contractData = {
      ...formValue,
      id: formValue.contractId,
    };

    this.contractsArray.push(this.fb.control(contractData));
    this.editMode = false;
    this.initContractForm();

    // Mostrar mensaje de éxito
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'El contrato se ha guardado correctamente',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#28a745',
    });

    // Limpiar errores
    this.validationErrors = [];
    this.sectionsWithErrors = {};

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
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al guardar el contrato',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#dc3545',
          });
        } else {
          this.initForm();
        }
      });
  }
}
