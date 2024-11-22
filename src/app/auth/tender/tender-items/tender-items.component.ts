import { map } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
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

  record_id = null;
  itemsForm!: FormGroup;
  additionalClassificationsForm!: FormGroup;

  classification = Classifications.map((m) => ({
    id: m.id,
    description: m.description,
    uri: m.uri,
  }));
  currency = Currency;

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

  loadForm(data: any): void {
    data.forEach((item: any) => {
      const {
        id,
        description,
        classification,
        additionalClassifications,
        quantity,
        unit,
      } = item;

      this.addItem.emit(
        this.fb.group({
          id,
          description,
          classification,
          additionalClassifications: this.fb.array(
            additionalClassifications.map((m: any) => this.fb.group({ ...m }))
          ),
          quantity,
          unit,
        })
      );

      this.itemsArray.push(this.itemsForm);
    });
  }

  loadData(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
    });

    this.api.getMethod(`/tender/${this.record_id}`).subscribe((d: any) => {
      const { tender, error, message } = d;

      if (error) {
        console.log('message: ', message);
      } else {
        // load forms
        if (tender !== null) this.loadForm(tender.items);
      }
    });
  }

  ngOnInit(): void {
    this.initForm();
    this.loadData();
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
