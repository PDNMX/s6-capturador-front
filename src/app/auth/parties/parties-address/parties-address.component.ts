import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-parties-address',
  templateUrl: './parties-address.component.html',
  styleUrls: ['./parties-address.component.css'],
})
export class PartiesAddressComponent implements OnInit {
  @Output() saveAddress = new EventEmitter<any>();

  addressForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.addressForm = this.fb.group({
      streetAddress: ['streetAddress', [Validators.required]],
      locality: ['locality', [Validators.required]],
      region: ['region', [Validators.required]],
      postalCode: ['postalCode', [Validators.required]],
      countryName: ['countryName', [Validators.required]],
    });
  }

  save(): void {
    // console.log(this.addressForm.value);
    this.saveAddress.emit(this.addressForm);
  }
}
