import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { ImplementationStatus, Currency } from 'src/utils';

@Component({
  selector: 'app-implementation-transactions',
  templateUrl: './implementation-transactions.component.html',
  styleUrls: ['./implementation-transactions.component.css'],
})
export class ImplementationTransactionsComponent implements OnInit {
  implementationStatus = ImplementationStatus;
  currency = Currency;

  statusForm!: FormGroup;
  transactionsForm!: FormGroup;
  payerForm!: FormGroup;

  payers = [
    { id: 1, name: 'Pagador 1' },
    { id: 2, name: 'Pagador 2' },
    { id: 3, name: 'Pagador 3' },
  ];

  constructor(private fb: FormBuilder) {}

  get payersArray() {
    return this.payerForm.controls['payers'] as FormArray;
  }

  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void {
    this.statusForm = this.fb.group({
      status: ['', Validators.required],
    });
    this.transactionsForm = this.fb.group({
      source: ['', Validators.required],
      date: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      value: this.fb.group({
        amount: ['', Validators.required],
        currency: ['', Validators.required],
      }),
    });

    this.payerForm = this.fb.group({
      id: ['null', Validators.required],
      payers: this.fb.array([]),
    });
  }

  addPayer(): void {
    const opt = this.payerForm.value.id;
    this.payersArray.push(this.fb.group({ ...opt }));
  }

  deletePayer(index: number): void {
    this.payersArray.removeAt(index);
  }

  // Método para obtener la descripción basada en el código seleccionado
  getImplementationStatusDesc(code: string): string {
    let dec = '';
    this.implementationStatus.forEach((t) => {
      if (t.code === code) dec = t.description;
    });
    return dec;
  }
}
