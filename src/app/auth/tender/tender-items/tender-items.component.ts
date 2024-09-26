import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  itemsForm!: FormGroup;
  additionalClassificationsForm!: FormGroup;

  classification = Classifications.map((m) => ({
    id: m.id,
    description: m.description,
    uri: m.uri,
  }));
  currency = Currency;

  constructor(private fb: FormBuilder) {}

  get additionalClassificationsArray() {
    return this.itemsForm.controls['additionalClassifications'] as FormArray;
  }

  addAdditionalClassifications(): void {
    const data = this.additionalClassificationsForm.value.data;
    const { id, description, unit, uri } = data;

    this.additionalClassificationsArray.push(
      this.fb.group({
        id: [id, Validators.required],
        description: [description, Validators.required],
        // unit: [unit, Validators.required],
        uri: [uri, Validators.required],
      })
    );
  }

  deleteAdditionalClassifications(index: number): void {
    this.additionalClassificationsArray.removeAt(index);
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.itemsForm = this.fb.group({
      description: ['', [Validators.required]],
      classification: [{}, [Validators.required]],
      additionalClassifications: this.fb.array([], [Validators.required]),
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

    this.additionalClassificationsForm = this.fb.group({
      data: [null, [Validators.required]],
    });
  }

  selectChange(): void {
    this.itemsForm.controls['unit'].patchValue({
      name: this.itemsForm.value.classification.unit,
    });
  }

  addNewItem(): void {
    this.addItem.emit(this.itemsForm);
    this.initForm();
  }
}
