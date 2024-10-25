import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContractStatus, Currency, RelatedProcesses } from 'src/utils';

@Component({
  selector: 'app-contracts-general',
  templateUrl: './contracts-general.component.html',
  styleUrls: ['./contracts-general.component.css'],
})
export class ContractsGeneralComponent implements OnInit {
  @Input() contractForm!: FormGroup;

  exchangeForm!: FormGroup;
  relatedProcessesForm!: FormGroup;
  surveillanceMechanismsValue: String = '';
  relationshipValue: String = '';

  contractStatus = ContractStatus;
  currency = Currency;
  relatedProcesses = RelatedProcesses;

  getRelatedProcessesDesc(code: string): string {
    let desc = '';

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
    this.surveillanceMechanismsArray.push(
      this.fb.control(this.surveillanceMechanismsValue)
    );
    this.surveillanceMechanismsValue = '';
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
    this.relatedProcessesArray.push(this.relatedProcessesForm);
  }

  deleteRelatedProcesses(index: number): void {
    this.relatedProcessesArray.removeAt(index);
  }

  get relationshipArray() {
    return this.relatedProcessesForm.controls['relationship'] as FormArray;
  }

  addRelationship(): void {
    console.log('this.relationshipValue: ', this.relationshipValue);

    this.relationshipArray.push(this.fb.control(this.relationshipValue));
    this.relationshipValue = '';
  }
  deleteRelationship(index: number): void {
    this.relationshipArray.removeAt(index);
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initExchangeForm();
    this.initRelatedProcessesForm();
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
