import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Countries from 'src/utils/countries';

@Component({
  selector: 'app-parties-address',
  templateUrl: './parties-address.component.html',
  styleUrls: ['./parties-address.component.css'],
})
export class PartiesAddressComponent implements OnInit {
  @Output() saveAddress = new EventEmitter<any>();

  addressForm!: FormGroup;
  countries = Countries; // importamos los países de la lista countries.ts
  searchText: string = '';

  constructor(private fb: FormBuilder) {}
  mostrarSpinner = false;

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

  save(): void {
    this.mostrarSpinner = true;
    //console.log(this.addressForm.value);
    this.saveAddress.emit(this.addressForm);
    setTimeout(() => {
      this.mostrarSpinner = false;
      console.log('agregando al arreglo');
    }, 1000);
  }
}
