import { map } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Classifications, Currency } from 'src/utils';

@Component({
  selector: 'app-planning-quotes',
  templateUrl: './planning-quotes.component.html',
  styleUrls: ['./planning-quotes.component.css']
})

export class PlanningQuotesComponent implements OnInit {
  @Input() itemsArray: Array<any> = [];
  @Output() addItem = new EventEmitter<any>();
  @Output() deleteItem = new EventEmitter<any>();


  record_id = null;
  planningQuotesForm!: FormGroup;
  additionalClassificationsForm!: FormGroup;
  planningItemsForm!: FormGroup;

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
    return this.planningQuotesForm.controls['additionalClassifications'] as FormArray;
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

      this.itemsArray.push(this.planningQuotesForm);
    });
  }

  loadData(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
    });

    this.api.getMethod(`/planning/${this.record_id}`).subscribe((d: any) => {
      const { planning, error, message } = d;

      if (error) {
        console.log('message: ', message);
      } else {
        // load forms
        if (planning !== null) this.loadForm(planning.items);
      }
    });
  }

  initForm(): void {
    this.planningQuotesForm = this.fb.group({
      id: ['', Validators.required],
      description: ['', [Validators.required]],
      date: ['', Validators.required],
      items: this.fb.array([], [Validators.required]),
      value: this.fb.group({
        amount: [0, [Validators.required]],
        currency: ['MXN', [Validators.required]],
      }),
      period: this.fb.group({
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        maxExtentDate: ['', Validators.required],
        durationInDays: ['', Validators.required],
      }),
      issuingSupplier: this.fb.group({
        name: ['', Validators.required],
        id: ['', Validators.required],
      }),
    });

    this.planningItemsForm = this.fb.group({
      id: ['', Validators.required],
      description: ['', [Validators.required]],
      classification: [{}, [Validators.required]],
      additionalClassifications: this.fb.array([], [Validators.required]),
      quantity: ['', [Validators.required]],
      unit: this.fb.group({
        schema: ['', [Validators.required]],
        id: ['', [Validators.required]],
        name: ['', [Validators.required]],
        value: this.fb.group({
          amount: [0, [Validators.required]],
          currency: ['MXN', [Validators.required]],
        }),
        uri: ['', [Validators.required]],
      }),
    });

    this.additionalClassificationsForm = this.fb.group({
      data: [null, [Validators.required]],
    });
  }

  selectChange(): void {
    this.planningItemsForm.controls['unit'].patchValue({
      name: this.planningItemsForm.value.classification.unit,
    });
  }

  addNewItem(): void {
    this.addItem.emit(this.planningItemsForm);
    this.initForm();
  }


  ngOnInit(): void {
    this.initForm();
    // this.loadData();
  }

}
