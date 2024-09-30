import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
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
  @Input() transactionsArray: Array<any> = [];
  @Output() addTransaction = new EventEmitter<any>();
  @Output() deleteTransaction = new EventEmitter<any>();

  implementationStatus = ImplementationStatus;
  currency = Currency;

  statusForm!: FormGroup;
  transactionsForm!: FormGroup;
  

  payers: Array<{id: number, name: string}> = [
    {id: 1, name: 'pagador 1'},
    {id: 2, name: 'pagador 2'},
    {id: 3, name: 'pagador 3'},
  ];

  payee: Array<{id: number, name: string}> = [
    {id: 1, name: 'beneficiario 1'},
    {id: 2, name: 'beneficiario 2'},
    {id: 3, name: 'beneficiario 3'},
  ]     

  constructor(private fb: FormBuilder) {}


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
      payer: [null, Validators.required],
      payee: [null, Validators.required],
      uri: ['', Validators.required],
    });

  
  }

  // Método para obtener la descripción basada en el código seleccionado
  getImplementationStatusDesc(code: string): string {
    let dec = '';
    this.implementationStatus.forEach((t) => {
      if (t.code === code) dec = t.description;
    });
    return dec;
  }
  
  addNewTransactions(): void {
    this.addTransaction.emit(this.transactionsForm);
    console.log(this.transactionsForm.value);
    this.initForm();
  }
}
