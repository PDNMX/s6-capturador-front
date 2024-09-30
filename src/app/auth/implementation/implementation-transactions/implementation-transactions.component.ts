import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-implementation-transactions',
  templateUrl: './implementation-transactions.component.html',
  styleUrls: ['./implementation-transactions.component.css']
})
export class ImplementationTransactionsComponent implements OnInit {
  transactionsForm!: FormGroup;
  constructor( private fb: FormBuilder) {}
  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void {
    this.transactionsForm = this.fb.group({
      status: ['', Validators.required],
    });
  }
}
