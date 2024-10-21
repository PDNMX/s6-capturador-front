import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContractStatus, Currency } from 'src/utils';

@Component({
  selector: 'app-contracts-general',
  templateUrl: './contracts-general.component.html',
  styleUrls: ['./contracts-general.component.css'],
})
export class ContractsGeneralComponent implements OnInit {
  @Input() contractForm!: FormGroup;

  exchangeForm!: FormGroup;
  surveillanceMechanismsValue: String = '';

  contractStatus = ContractStatus;
  currency = Currency;

  get exchangeRatesArray() {
    const value = this.contractForm.get('value');
    return value?.get('exchangeRates') as FormArray;
  }

  addExchangeRates(): void {
    console.log('this.exchangeRatesArray: ', this.exchangeRatesArray);
    this.exchangeRatesArray.push(this.exchangeForm);
    console.log('this.exchangeRatesArray: ', this.exchangeRatesArray);

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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initExchangeForm();
  }

  initExchangeForm(): void {
    this.exchangeForm = this.fb.group({
      rate: ['rate', [Validators.required]],
      currency: ['currency', [Validators.required]],
      date: ['date', [Validators.required]],
      source: ['source', [Validators.required]],
    });
  }
}
