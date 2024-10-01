import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
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
    this.addBeneficialOwners.emit(this.beneficialOwnersForm);
    // console.log('beneficialOwnersForm: ', this.beneficialOwnersForm.value);
    this.initForm();
  }
}
