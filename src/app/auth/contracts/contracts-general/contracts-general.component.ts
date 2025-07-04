import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ContractStatus, Currency, RelatedProcesses } from 'src/utils';
import SurveillanceMechanismsType from 'src/utils/surveillanceMechanismsType';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

interface StoredMechanism {
  code: string;
  title: string;
}

interface StoredRelatedProcess {
  code: string;
  title: string;
  description: string;
}
@Component({
  selector: 'app-contracts-general',
  templateUrl: './contracts-general.component.html',
  styleUrls: ['./contracts-general.component.css'],
})
export class ContractsGeneralComponent implements OnInit {
  @Input() contractForm!: FormGroup;
  @Output() saveGeneralDataForm = new EventEmitter<any>();

  record_id = null;
  awardsForm: any;
  awardIds: string[] = [];

  exchangeForm!: FormGroup;
  relatedProcessesForm!: FormGroup;
  relationshipValue: String = '';
  selectedMechanism: any = null;
  surveillanceMechanismsControl = new FormControl('');
  relatedProcessControl = new FormControl('');
  selectedRelatedProcess: any = null;

  contractStatus = ContractStatus;
  currency = Currency;
  relatedProcesses = RelatedProcesses;
  surveillanceMechanismsType = SurveillanceMechanismsType;

  mostrarSpinner = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
      this.loadData();
    });
    this.initExchangeForm();
    this.initRelatedProcessesForm();
    this.initSurveillanceMechanismsControl();
    this.initRelatedProcessControl();

    this.contractForm.addControl('hasRelatedProcesses', new FormControl(false));

    this.contractForm
      .get('hasRelatedProcesses')
      ?.valueChanges.subscribe((value) => {
        if (!value) {
          while (this.relatedProcessesArray.length > 0) {
            this.relatedProcessesArray.removeAt(0);
          }
          this.relatedProcessesForm.reset();
          this.initRelatedProcessesForm();
        }
      });
  }

  trackByIndex(index: number, _: any): number {
    return index;
  }

  loadData(): void {
    if (this.record_id) {
      this.api.getMethod(`/awards/${this.record_id}`).subscribe({
        next: (d: any) => {
          const { awards, error, message } = d;
          if (error) {
            console.log('message: ', message);
          } else {
            if (Array.isArray(awards)) {
              this.awardIds = awards.map((award: any) => award.id);
            } else {
              console.error('Awards is not an array:', awards);
            }
          }
        },
        error: (err) => {
          console.error('Error loading awards:', err);
        },
      });
    }
  }

  saveGeneralForm(): void {
    this.mostrarSpinner = true;

    // Emitir los controls como lo hace awards-general
    this.saveGeneralDataForm.emit(this.contractForm.controls);

    setTimeout(() => {
      this.mostrarSpinner = false;
      console.log('Datos generales guardados');
    }, 1000);
  }

  enableSaveButton(): boolean {
    const requiredFields = [
      'contractId',
      'awardID',
      'title',
      'description',
      'status',
      'dateSigned',
    ];
    const hasRequiredData = requiredFields.every((field) => {
      const control = this.contractForm.get(field);
      return control && control.value && control.value.toString().trim() !== '';
    });

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

    return hasRequiredData && hasPeriodData && hasValueData;
  }

  initSurveillanceMechanismsControl(): void {
    this.surveillanceMechanismsControl.valueChanges.subscribe((value) => {
      if (value) {
        this.selectedMechanism = this.surveillanceMechanismsType.find(
          (type) => type.code === value
        );
      }
    });
  }

  initRelatedProcessControl(): void {
    this.relatedProcessControl.valueChanges.subscribe((value) => {
      if (value) {
        this.selectedRelatedProcess = this.relatedProcesses.find(
          (type) => type.code === value
        );
      }
    });
  }

  get contractId() {
    return this.contractForm.get('contractId') as FormControl;
  }
  get awardID() {
    return this.contractForm.get('awardID') as FormControl;
  }
  get title() {
    return this.contractForm.get('title') as FormControl;
  }
  get description() {
    return this.contractForm.get('description') as FormControl;
  }
  get status() {
    return this.contractForm.get('status') as FormControl;
  }
  get period() {
    return this.contractForm.get('period') as FormGroup;
  }
  getControl(name: string): FormControl {
    return this.period.get(name) as FormControl;
  }
  get amount() {
    return this.contractForm.get('value')?.get('amount') as FormControl;
  }
  get netAmount() {
    return this.contractForm.get('value')?.get('netAmount') as FormControl;
  }
  get dateSigned() {
    return this.contractForm.get('dateSigned') as FormControl;
  }

  getRelatedProcessesDesc(code: string): string {
    const process = this.relatedProcesses.find((p) => p.code === code);
    return process?.description || '';
  }

  getRelatedProcessTitle(code: string): string {
    const process = this.relatedProcesses.find((p) => p.code === code);
    return process ? process.title : code;
  }

  getSurveillanceMechanismTypeDesc(code: string): string {
    let desc = '';
    SurveillanceMechanismsType.forEach((type) => {
      if (type.code === code) desc = type.description;
    });
    return desc;
  }

  get exchangeRatesArray() {
    const value = this.contractForm.get('value');
    return value?.get('exchangeRates') as FormArray;
  }

  isForeignCurrencySelected(): boolean {
    return this.contractForm?.get('value.currency')?.value !== 'MXN';
  }

  showRelatedProcessesSection(): boolean {
    return this.contractForm?.get('hasRelatedProcesses')?.value === true;
  }

  addExchangeRates(): void {
    this.exchangeRatesArray.push(this.exchangeForm);
    this.initExchangeForm();
  }

  deleteExchangeRates(index: number): void {
    this.exchangeRatesArray.removeAt(index);
  }

  get surveillanceMechanismsArray() {
    return this.contractForm.controls['surveillanceMechanisms'] as FormArray;
  }

  addSurveillanceMechanisms() {
    const selectedCode = this.surveillanceMechanismsControl.value;

    if (!selectedCode) return;

    const yaExiste =
      this.surveillanceMechanismsArray.value.includes(selectedCode);

    if (yaExiste) {
      Swal.fire({
        icon: 'warning',
        title: 'Mecanismo duplicado',
        text: 'Este mecanismo de vigilancia ya ha sido agregado.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#ffc107',
      });
      return;
    }

    const selectedMechanism = this.surveillanceMechanismsType.find(
      (type) => type.code === selectedCode
    );

    if (selectedMechanism) {
      this.surveillanceMechanismsArray.push(
        this.fb.control(selectedMechanism.code)
      );

      console.log('Array después de agregar:', {
        surveillanceMechanisms: this.surveillanceMechanismsArray.value,
      });

      this.surveillanceMechanismsControl.reset();
      this.selectedMechanism = null;
    }
  }

  getMechanismTitle(code: string): string {
    const mechanism = this.surveillanceMechanismsType.find(
      (type) => type.code === code
    );
    return mechanism ? mechanism.title : code;
  }

  deleteSurveillanceMechanisms(index: number) {
    this.surveillanceMechanismsArray.removeAt(index);
  }

  getContractStatusDesc(code: string): string {
    const ele = this.contractStatus.find((e) => e.code === code);
    return ele?.description || '';
  }

  get relatedProcessesArray() {
    return this.contractForm.controls['relatedProcesses'] as FormArray;
  }

  addRelatedProcesses(): void {
    this.mostrarSpinner = true;
    this.relatedProcessesArray.push(this.relatedProcessesForm);
    setTimeout(() => {
      this.mostrarSpinner = false;
      console.log('agregando al arreglo');
    }, 1000);
  }

  confirmAndDeleteRelatedProcesses(index: number): void {
    Swal.fire({
      text: '¿Deseas eliminar este proceso relacionado?',
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
        this.deleteRelatedProcesses(index);
      }
    });
  }

  deleteRelatedProcesses(index: number): void {
    this.relatedProcessesArray.removeAt(index);
  }

  get relationshipArray() {
    return this.relatedProcessesForm.controls['relationship'] as FormArray;
  }

  addRelationship(): void {
    const selectedValue = this.relatedProcessControl.value;

    if (!selectedValue) return;

    const yaExiste = this.relationshipArray.value.includes(selectedValue);

    if (yaExiste) {
      Swal.fire({
        icon: 'warning',
        title: 'Relación duplicada',
        text: 'Esta relación ya ha sido agregada al proceso relacionado.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#ffc107',
      });
      return;
    }

    this.relationshipArray.push(this.fb.control(selectedValue));
    console.log('Relación agregada:', {
      relationships: this.relationshipArray.value,
    });
    this.relatedProcessControl.reset();
    this.selectedRelatedProcess = null;
  }

  deleteRelationship(index: number): void {
    this.relationshipArray.removeAt(index);
  }

  initExchangeForm(): void {
    this.exchangeForm = this.fb.group({
      rate: [null],
      currency: ['MXN'],
      date: [null],
      source: [null],
    });
  }

  initRelatedProcessesForm(): void {
    this.relatedProcessesForm = this.fb.group({
      id: [null],
      relationship: this.fb.array([]),
      title: [null],
      scheme: [null],
      identifier: [null],
      uri: [null],
    });
  }
}
