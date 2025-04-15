import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService, IPartieList } from 'src/app/services/api.service';
import { ImplementationStatus, Currency, PaymentMethods } from 'src/utils';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-contracts-implementation-transactions',
  templateUrl: './contracts-implementation-transactions.component.html',
  styleUrls: ['./contracts-implementation-transactions.component.css'],
})
export class ContractsImplementationTransactionsComponent implements OnInit {
  @Input() transactionsArray: Array<any> = [];
  @Output() addTransaction = new EventEmitter<any>();
  @Output() deleteTransaction = new EventEmitter<any>();

  record_id = null;
  currency = Currency;
  transactionsForm!: FormGroup;

  payers: Array<any> = [];
  payee: Array<any> = [];
  mostrarSpinner = false;
  paymentMethods = PaymentMethods;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
    });

    if (this.record_id) {
      this.api
        .getPartiesByType(this.record_id, 'payer')
        .subscribe((d: IPartieList) => {
          this.payers = d.data;
        });

      this.api
        .getPartiesByType(this.record_id, 'payee')
        .subscribe((d: IPartieList) => {
          this.payee = d.data;
        });
    }

    this.initForm();
  }
  initForm(): void {
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
      uri: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^https?:\/\/(?:[a-zA-Z0-9\-._~%!$&'()*+,;=:@]+|%[0-9A-Fa-f]{2})*(?:\/(?:[a-zA-Z0-9\-._~%!$&'()*+,;=:@]+|%[0-9A-Fa-f]{2})*)*(?:\?(?:[a-zA-Z0-9\-._~%!$&'()*+,;=:@/?]+|%[0-9A-Fa-f]{2})*)?(?:#(?:[a-zA-Z0-9\-._~%!$&'()*+,;=:@/?]+|%[0-9A-Fa-f]{2})*)?$/
          ),
        ],
      ],
    });
  }

  get date() {
    return this.transactionsForm.get('date') as FormControl;
  }
  get source() {
    return this.transactionsForm.get('source') as FormControl;
  }
  get paymentMethod() {
    return this.transactionsForm.get('paymentMethod') as FormControl;
  }
  get amount() {
    return this.transactionsForm.get('value')?.get('amount') as FormControl;
  }
  get currencyTransaction() {
    return this.transactionsForm.get('value')?.get('currency') as FormControl;
  }
  get uri() {
    return this.transactionsForm.get('uri') as FormControl;
  }

  getPaymentMethodDesc(code: string): string {
    let desc = '';
    this.paymentMethods.forEach((method) => {
      if (method.code === code) desc = method.description;
    });

    return desc;
  }

  enableAddTransactionsButton(): boolean {
    return this.transactionsForm.valid && this.transactionsForm.dirty;
  }

  addNewTransactions(): void {
    this.mostrarSpinner = true;
    this.addTransaction.emit(this.transactionsForm);
    console.log(this.transactionsForm.value);
    this.initForm();
    setTimeout(() => {
      this.mostrarSpinner = false;
      console.log('agregando al arreglo');
    }, 1000);
  }
  confirmAndDeleteTransaction(index: number): void {
    Swal.fire({
      text: '¿Deseas eliminar esta transacción?',
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
        this.deleteTransaction.emit(index);
      }
    });
  }
}
