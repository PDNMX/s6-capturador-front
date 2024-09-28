import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-parties-address',
  templateUrl: './parties-address.component.html',
  styleUrls: ['./parties-address.component.css'],
})
export class PartiesAddressComponent implements OnInit {
  addressForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.addressForm = this.fb.group({
      streetAddress: ['', [Validators.required]],
      locality: ['', [Validators.required]],
      region: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      countryName: ['', [Validators.required]],
    });
  }
}
