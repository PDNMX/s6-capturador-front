import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface RoleOption {
  id:string;
  label: string;
}
@Component({
  selector: 'app-parties',
  templateUrl: './parties.component.html',
  styleUrls: ['./parties.component.css'],
})
export class PartiesComponent implements OnInit {
  Parties!: FormGroup;
  rolesList: RoleOption[] = [
    { id: 'buyer', label: 'Comprador' },
    { id: 'procuringEntity', label: 'Entidad contratante' },
    { id: 'supplier', label: 'Proveedor' },
    { id: 'tenderer', label: 'Licitante' },
    { id: 'funder', label: 'Financiador' },
    { id: 'enquirer', label: 'Persona que solicita información' },
    { id: 'payer', label: 'Pagador' },
    { id: 'payee', label: 'Beneficiario' },
    { id: 'reviewBody', label: 'Órgano de revisión' },
    { id: 'interestedParty', label: 'Parte interesada' }
  ];

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.initForm();
  }
initForm(): void {
  this.Parties = this.fb.group({
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
    roles: this.fb.group(
      this.rolesList.reduce<Record<string, boolean>>((acc, role) => {
        acc[role.id] = false;
        return acc;
      }, {})
    ),
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
     details: this.fb.group({
      listedOnRegulatedMarket: [false],
    }),
  });
}

onRoleChange(): void {
  const rolesFormGroup = this.Parties.get('roles');
  if (rolesFormGroup) {
    const selectedRoles = Object.keys(rolesFormGroup.value)
    .filter(key => rolesFormGroup.value[key])
    .map(key => key);

  console.log('Roles seleccionados:', selectedRoles);
  }

}
  onSubmit() {
    if (this.Parties.valid)  {
      const formValue = this.Parties.value;
      const selectedRoles = Object.keys(formValue.roles)
      .filter(key => formValue.roles[key])
      .map(key => key);
      formValue.roles = selectedRoles;
      console.log(formValue);
    } else {
      console.log('Form is invalid');
    }

  }
}
