import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tender-items',
  templateUrl: './tender-items.component.html',
  styleUrls: ['./tender-items.component.css'],
})
export class TenderItemsComponent implements OnInit {
  items: any[] = [];
  itemsForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.defForm();
  }

  defForm(): void {
    this.itemsForm = this.fb.group({
      description: ['', [Validators.required]],
      classification: [{}, [Validators.required]],
      additionalClassifications: [{}, [Validators.required]],
      quantity: ['', [Validators.required]],
      unit: ['', [Validators.required]],
    });
  }

  submitForm(): void {
    console.log('this.itemsForm.value: ', this.itemsForm.value);
    this.items.push(this.itemsForm.value);
    this.defForm();
  }

  deleteItem(position: number): void {
    this.items = this.items.filter((val, index) => index !== position);
  }
}
