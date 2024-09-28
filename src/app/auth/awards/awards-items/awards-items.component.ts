import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Classifications, Currency } from 'src/utils';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-awards-items',
  templateUrl: './awards-items.component.html',
  styleUrls: ['./awards-items.component.css'],
})
export class AwardsItemsComponent implements OnInit {
  @Input() itemsArray: Array<any> = [];
  @Output() addItem = new EventEmitter<any>();
  @Output() deleteItem = new EventEmitter<any>();

  itemsForm!: FormGroup;
  additionalClassificationsForm!: FormGroup;

  record_id: string = '';

  classification = Classifications.map((m) => ({
    id: m.id,
    description: m.description,
    uri: m.uri,
  }));
  currency = Currency;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute
  ) {}
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

    this.api.getMethod(`/awards/${this.record_id}`).subscribe((d: any) => {
      const { award, error, message } = d;

      if (error) {
        console.log('message: ', message);
      } else {
        // load forms
        if (award !== null) this.loadForm(award.items);
      }
    });
  }

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
        uri: [uri, Validators.required],
      })
    );
  }

  deleteAdditionalClassifications(index: number): void {
    this.additionalClassificationsArray.removeAt(index);
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
          amount: ['', [Validators.required]],
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
    console.log(this.itemsForm.value);
    this.initForm();
  }
}
