import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Currency, Language } from 'src/utils';

@Component({
  selector: 'app-awards-items',
  templateUrl: './awards-items.component.html',
  styleUrls: ['./awards-items.component.css']
})
export class AwardsItemsComponent implements OnInit{
currency = Currency;
language = Language;

itemsForm!: FormGroup;

constructor(private fb: FormBuilder) { }

ngOnInit(): void {
  this.initForm();
}

initForm(): void {
  this.itemsForm = this.fb.group({
    id: ['', Validators.required],
    description: ['', Validators.required],
    quantity: ['', Validators.required],
    unit: this.fb.group({
      id: [''],
      scheme: [''],
      name: [''],
      uri: [''],
      value: this.fb.group({
        amount: [''],
        currency: [''],
      }),
    }),
    classification: this.fb.group({
      id: ['', Validators.required],
      description: ['', Validators.required],
      scheme: [''],
      uri: [''],
    }),
    additionalClassifications: this.fb.group({
      id: ['', Validators.required],
      description: ['', Validators.required],
      scheme: [''],
      uri: [''],
    }),
  });
}
}
