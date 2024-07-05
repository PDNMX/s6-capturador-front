import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.css'],
})
export class AwardsComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  ngOnInit() {}

  Awards = this.fb.group({
    id: ['', Validators.required],
    status: ['', Validators.required],
    title: ['', Validators.required],
    description: ['', Validators.required],
    rationale: ['', Validators.required],
    date: ['', Validators.required],
    value: this.fb.group({
      amount: ['', Validators.required],
      currency: ['', Validators.required],
    }),
    contractPeriod: this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      maxExtentDate: ['', Validators.required],
      durationInDays: ['', Validators.required],
    }),
  });

  AwardsSuppliers = this.fb.group({
    suppliers: this.fb.group({
      id: [''],
      name: [''],
    }),
  });

  AwardsItems = this.fb.group({
    items: this.fb.group({
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
    }),
  });

  onSubmit() {
    console.log(this.Awards.value);
  }

  onSubmitSuppliers() {
    console.log(this.AwardsSuppliers.value);
  }

  onSubmitItems() {
    console.log(this.AwardsItems.value);
  }
}
