import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Classifications, Currency } from 'src/utils';

@Component({
  selector: 'app-tender-items',
  templateUrl: './tender-items.component.html',
  styleUrls: ['./tender-items.component.css'],
})
export class TenderItemsComponent implements OnInit {
  @Input() itemsArray: Array<any> = [];
  @Output() addItem = new EventEmitter<any>();
  @Output() deleteItem = new EventEmitter<any>();

  items: any[] = [];
  itemsForm!: FormGroup;

  classification = Classifications;
  currency = Currency;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.itemsForm = this.fb.group({
      description: ['', [Validators.required]],
      classification: [{}, [Validators.required]],
      additionalClassifications: [{}, [Validators.required]],
      quantity: ['', [Validators.required]],
      unit: this.fb.group({
        name: ['', [Validators.required]],
        value: this.fb.group({
          amount: ['', [Validators.required]],
          amountNet: ['', [Validators.required]],
          currency: ['', [Validators.required]],
        }),
      }),
    });
  }

  submitForm(): void {
    console.log('this.itemsForm.value: ', this.itemsForm.value);
  }

  addNewItem(): void {
    //this.itemsForm.value.classification.unit
    const unit = this.itemsForm.value.unit.name
      ? this.itemsForm.value.unit.name
      : this.itemsForm.value.classification.unit;

    const newUnit = { ...this.itemsForm.value.unit, name: unit };
    console.log('unit: ', unit);
    this.addItem.emit({
      ...this.itemsForm.value,
      unit: newUnit,
    });
    this.initForm();
  }
}
