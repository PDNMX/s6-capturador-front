import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface RoleOption {
  id: string;
  label: string;
}
@Component({
  selector: 'app-parties',
  templateUrl: './parties.component.html',
  styleUrls: ['./parties.component.css'],
})
export class PartiesComponent implements OnInit {
  partiesForm!: FormGroup;
  partieForm!: FormGroup;

  editMode: boolean = false;

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
    { id: 'interestedParty', label: 'Parte interesada' },
  ];

  constructor(private fb: FormBuilder) {}

  newPartie(): void {
    this.editMode = true;
  }

  get partiesArray() {
    return this.partiesForm.controls['parties'] as FormArray;
  }

  deletePartie(index: number): void {
    this.partiesArray.removeAt(index);
  }

  getParties(): string {
    return JSON.stringify(this.partiesForm.value, undefined, 4);
  }

  getPartie(): string {
    return JSON.stringify(this.partieForm.value, undefined, 4);
  }

  savePartie(): void {
    const parties = this.partiesArray;
    parties.push(this.partieForm);
    this.initPartieForm();
    this.editMode = false;
  }

  saveGeneral(general: FormGroup): void {
    this.partieForm = this.fb.group({
      ...general.controls,
      ...this.partieForm.controls,
    });
  }

  saveAddress(address: FormGroup): void {
    this.partieForm = this.fb.group({
      ...this.partieForm.controls,
      address: this.fb.group({
        ...address.controls,
      }),
    });
  }

  saveContactPoint(contactPoint: FormGroup): void {
    this.partieForm = this.fb.group({
      ...this.partieForm.controls,
      contactPoint: this.fb.group({
        ...contactPoint.controls,
      }),
    });
  }

  get additionalContactPointsArray() {
    return this.partieForm.controls['additionalContactPoints'] as FormArray;
  }

  addAdditionalContactPoints(contact: any): void {
    this.additionalContactPointsArray.push(contact);
  }

  deleteAdditionalContactPoints(index: number): void {
    this.additionalContactPointsArray.removeAt(index);
  }

  get beneficialOwnersArray() {
    return this.partieForm.controls['beneficialOwners'] as FormArray;
  }

  addBeneficialOwners(beneficialOwners: any): void {
    this.beneficialOwnersArray.push(beneficialOwners);
  }
  deleteBeneficialOwners(index: number): void {
    this.beneficialOwnersArray.removeAt(index);
  }

  getAddress() {
    return this.partieForm.controls['address'] as FormGroup;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initPartieForm(): void {
    this.partieForm = this.fb.group({
      address: null,
      contactPoint: null,
      additionalContactPoints: this.fb.array([]),
      beneficialOwners: this.fb.array([]),
    });
  }

  initForm(): void {
    this.partiesForm = this.fb.group({
      parties: this.fb.array([]),
    });

    this.initPartieForm();
  }
}
