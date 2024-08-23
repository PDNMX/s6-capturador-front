import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-parties',
  templateUrl: './parties.component.html',
  styleUrls: ['./parties.component.css'],
})
export class PartiesComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {}

  Parties = this.fb.group({
    id: ['', Validators.required],
    name: ['', Validators.required],
    position: ['', Validators.required],
    identifier: this.fb.group({
      id: [''],
      legalPersonality: ['', Validators.required],
      scheme: [''],
      legalName: [''],
      givenName: [''],
      patronymicName: [''],
      matronymicName: [''],
      uri: [''],
    }),
    additionalIdentifiers: this.fb.group({
      id: [''],
      scheme: [''],
      legalName: [''],
      uri: [''],
    }),
    address: this.fb.group({
      streetAddress: [''],
      locality: [''],
      region: [''],
      postalCode: [''],
      countryName: [''],
    }),
    contactPoint: this.fb.group({
      type: [''],
      name: [''],
      givenName: [''],
      patronymicName: [''],
      matronymicName: [''],
      email: [''],
      telephone: [''],
      faxNumber: [''],
      url: [''],
      availableLanguage: [''],
    }),
    additionalContactPoints: this.fb.group({
      type: [''],
      name: [''],
      givenName: [''],
      patronymicName: [''],
      matronymicName: [''],
      email: [''],
      telephone: [''],
      faxNumber: [''],
      url: [''],
      availableLanguage: [''],
    }),
    roles: this.fb.group({
      buyer: [''],
      procuringEntity: [''],
      supplier: [''],
      tenderer: [''],
      funder: [''],
      enquirer: [''],
      payer: [''],
      payee: [''],
      reviewBody: [''],
      interestedParty: [''],
    }),
    memberOf: this.fb.group({
      id: [''],
      name: [''],
    }),
    beneficialOwners: this.fb.group({
      id: [''],
      name: [''],
      nationality: [''],
      email: [''],
      faxNumber: [''],
      telephone: [''],
      identifier: this.fb.group({
        id: [''],
        scheme: [''],
      }),
      address: this.fb.group({
        streetAddress: [''],
        locality: [''],
        region: [''],
        postalCode: [''],
        countryName: [''],
      }),
    }),
   /*  details: this.fb.group({
      listedOnRegulatedMarket: ['false'],
    }), */
  });

  onSubmit() {
    console.log(this.Parties.value);
  }
}
