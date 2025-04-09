import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  @Input() title: String = 'Articulos a ser cotizados';
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

  mostrarSpinner = false;

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

  get description(): FormControl {
    return this.itemsForm.get('description') as FormControl;
  }

  get item_classification(): FormControl {
    return this.itemsForm.get('classification') as FormControl;
  }

  get quantity(): FormControl {
    return this.itemsForm.get('quantity') as FormControl;
  }

  get unit(): FormGroup {
    return this.itemsForm.get('unit') as FormGroup;
  }

  get name(): FormControl {
    return this.unit.get('name') as FormControl;
  }

  get value(): FormControl {
    return this.unit.get('value') as FormControl;
  }

  get amount(): FormControl {
    return this.value.get('amount') as FormControl;
  }

  get netAmount(): FormControl {
    return this.value.get('netAmount') as FormControl;
  }

  initForm(): void {
    this.itemsForm = this.fb.group({
      description: ['', [Validators.required]],
      classification: [{}, [Validators.required]],
      additionalClassifications: this.fb.array([], [Validators.required]),
      quantity: ['', [Validators.required, Validators.min(0)]],
      unit: this.fb.group({
        name: ['', [Validators.required]],
        value: this.fb.group({
          amount: [, [Validators.required]],
          netAmount: [, [Validators.required]],
          currency: ['MXN', [Validators.required]],
        }),
      }),
    });

    this.additionalClassificationsForm = this.fb.group({
      data: [null, [Validators.required]],
    });
  }

  addNewItem(): void {
    this.mostrarSpinner = true;
    this.addItem.emit(this.itemsForm);
    this.initForm();
    setTimeout(() => {
      this.mostrarSpinner = false;
      console.log('agregando al arreglo');
    }, 1000);
  }
}
