import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ContractStatus, Currency, RelatedProcesses } from 'src/utils';
import SurveillanceMechanismsType from 'src/utils/surveillanceMechanismsType';

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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initExchangeForm();
    this.initRelatedProcessesForm();
    this.initSurveillanceMechanismsControl();
    this.initRelatedProcessControl();
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
    if (this.surveillanceMechanismsControl.value) {
      const selectedMechanism = this.surveillanceMechanismsType.find(
        (type) => type.code === this.surveillanceMechanismsControl.value
      );

      if (selectedMechanism) {
        this.surveillanceMechanismsArray.push(
          this.fb.control(selectedMechanism.code) // Guardamos el título en lugar del código
        );

        console.log('Array despues de agregar:', {
          surveillanceMechanisms: this.surveillanceMechanismsArray.value,
        });

        this.surveillanceMechanismsControl.reset();
        this.selectedMechanism = null;
      }
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

  deleteRelatedProcesses(index: number): void {
    this.relatedProcessesArray.removeAt(index);
  }

  get relationshipArray() {
    return this.relatedProcessesForm.controls['relationship'] as FormArray;
  }

  addRelationship(): void {
    if (this.relatedProcessControl.value) {
      this.relationshipArray.push(
        this.fb.control(this.relatedProcessControl.value)
      );
      console.log('Relación agregada:', {
        relationships: this.relationshipArray.value,
      });
      this.relatedProcessControl.reset();
      this.selectedRelatedProcess = null;
    }
  }

  deleteRelationship(index: number): void {
    this.relationshipArray.removeAt(index);
  }

  initExchangeForm(): void {
    this.exchangeForm = this.fb.group({
      rate: ['', [Validators.required]],
      currency: ['MXN', [Validators.required]],
      date: ['', [Validators.required]],
      source: ['', [Validators.required]],
    });
  }

  initRelatedProcessesForm(): void {
    this.relatedProcessesForm = this.fb.group({
      id: ['', [Validators.required]],
      relationship: this.fb.array([]),
      title: ['', [Validators.required]],
      scheme: ['', [Validators.required]],
      identifier: ['', [Validators.required]],
      uri: ['', [Validators.required]],
    });
  }
}
