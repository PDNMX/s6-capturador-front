import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-parties-beneficial-owners',
  templateUrl: './parties-beneficial-owners.component.html',
  styleUrls: ['./parties-beneficial-owners.component.css'],
})
export class PartiesBeneficialOwnersComponent implements OnInit {
  @Input() beneficialOwnersArray: Array<any> = [];
  @Output() addBeneficialOwners = new EventEmitter<any>();
  @Output() deleteBeneficialOwners = new EventEmitter<any>();

  beneficialOwnersForm!: FormGroup;
  mostrarSpinner = false;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  get name(): FormControl {
    return this.beneficialOwnersForm.get('name') as FormControl;
  }

  get identifier(): FormGroup {
    return this.beneficialOwnersForm.get('identifier') as FormGroup;
  }

  get schema(): FormControl {
    return this.identifier.get('schema') as FormControl;
  }

  get id(): FormControl {
    return this.identifier.get('id') as FormControl;
  }

  get nationality(): FormControl {
    return this.beneficialOwnersForm.get('nationality') as FormControl;
  }

  get email(): FormControl {
    return this.beneficialOwnersForm.get('email') as FormControl;
  }

  get telephone(): FormControl {
    return this.beneficialOwnersForm.get('telephone') as FormControl;
  }

  get faxNumber(): FormControl {
    return this.beneficialOwnersForm.get('faxNumber') as FormControl;
  }

  get address(): FormGroup {
    return this.beneficialOwnersForm.get('address') as FormGroup;
  }

  get streetAddress(): FormControl {
    return this.address.get('streetAddress') as FormControl;
  }

  get locality(): FormControl {
    return this.address.get('locality') as FormControl;
  }

  get region(): FormControl {
    return this.address.get('region') as FormControl;
  }

  get postalCode(): FormControl {
    return this.address.get('postalCode') as FormControl;
  }

  get countryName(): FormControl {
    return this.address.get('countryName') as FormControl;
  }

  initForm(): void {
    this.beneficialOwnersForm = this.fb.group({
      name: ['', [Validators.required]],
      identifier: this.fb.group({
        scheme: ['MX-RFC', [Validators.required]],
        id: ['', [Validators.required]],
      }),
      nationality: ['', [Validators.required]],
      email: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      faxNumber: ['', [Validators.required]],
      address: this.fb.group({
        streetAddress: ['', [Validators.required]],
        locality: ['', [Validators.required]],
        region: ['', [Validators.required]],
        postalCode: ['', [Validators.required]],
        countryName: ['', [Validators.required]],
      }),
    });
  }

  addNewBeneficialOwners(): void {
    this.mostrarSpinner = true;
    this.addBeneficialOwners.emit(this.beneficialOwnersForm);
    // console.log('beneficialOwnersForm: ', this.beneficialOwnersForm.value);
    this.initForm();
    setTimeout(() => {
      this.mostrarSpinner = false;
      console.log('agregando al arreglo');
    }, 1000);
  }
}
