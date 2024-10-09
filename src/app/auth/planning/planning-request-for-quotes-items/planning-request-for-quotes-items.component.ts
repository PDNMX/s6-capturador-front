import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Classifications, Currency } from 'src/utils';

@Component({
  selector: 'app-planning-request-for-quotes-items',
  templateUrl: './planning-request-for-quotes-items.component.html',
  styleUrls: ['./planning-request-for-quotes-items.component.css'],
})
export class PlanningRequestForQuotesItemsComponent implements OnInit {
  @Input() itemsArray: Array<any> = [];
  @Output() addItem = new EventEmitter<any>();
  @Output() deleteItem = new EventEmitter<any>();

  itemsForm!: FormGroup;
  additionalClassificationsForm!: FormGroup;

  currency = Currency;
  classification = Classifications.map((m) => ({
    id: m.id,
    description: m.description,
    uri: m.uri,
  }));

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

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
      description: ['description', [Validators.required]],
      classification: [{}, [Validators.required]],
      additionalClassifications: this.fb.array([], [Validators.required]),
      quantity: ['', [Validators.required]],
      unit: this.fb.group({
        name: ['', [Validators.required]],
        value: this.fb.group({
          amount: [0, [Validators.required]],
          amountNet: [0, [Validators.required]],
          currency: ['MXN', [Validators.required]],
        }),
      }),
    });

    this.additionalClassificationsForm = this.fb.group({
      data: [null, [Validators.required]],
    });
  }

  addNewItem(): void {
    this.addItem.emit(this.itemsForm);
    this.initForm();
  }
}
