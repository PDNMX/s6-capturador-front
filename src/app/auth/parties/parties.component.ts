import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { getRoleTitle } from 'src/utils/partyRole';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-parties',
  templateUrl: './parties.component.html',
  styleUrls: ['./parties.component.css'],
})
export class PartiesComponent implements OnInit {
  record_id = null;
  partiesForm!: FormGroup;
  partieForm!: FormGroup;

  editMode: boolean = false;

  Parties!: FormGroup;
  showBeneficiariesSection: boolean = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute
  ) {}

  newPartie(): void {
    this.editMode = true;
  }

  get partiesArray() {
    return this.partiesForm.controls['parties'] as FormArray;
  }

  onShowBeneficiaries(show: boolean) {
    this.showBeneficiariesSection = show;
  }

  confirmAndDeletePartie(index: number): void {
    Swal.fire({
      //title: '¿Estás seguro?',
      text: '¿Realmente deseas eliminar este actor?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          //title: 'Eliminado!',
          text: 'El registro ha sido eliminado.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        })
        this.deletePartie(index);
      }
    });
  }

  deletePartie(index: number): void {
    this.partiesArray.removeAt(index);
    this.saveData();
  }

  getRoleTitle(code: string): string {
    return getRoleTitle(code);
  }

  getParties(): string {
    return JSON.stringify(this.partiesForm.value, undefined, 4);
  }

  getPartie(): string {
    return JSON.stringify(this.partieForm.value, undefined, 4);
  }

  // MÉTODO PRINCIPAL DE VALIDACIÓN Y GUARDADO
  savePartie(): void {
    const general = this.partieForm;

    // Primero marcamos todo como tocado para mostrar errores visuales
    general.markAllAsTouched();

    // Validamos solo los campos realmente requeridos
    const validationResult = this.validateRequiredFields();

    if (!validationResult.isValid) {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        html: `Debes completar la información requerida:<br><br>${validationResult.errors.join('<br>')}`,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#ffc107',
      });

      return;
    }

    // Si todo es válido
    this.partiesArray.push(this.partieForm);
    this.initPartieForm();
    this.saveData();
    this.editMode = false;
  }

  // VALIDACIÓN PRINCIPAL
  private validateRequiredFields(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // 1. VALIDAR INFORMACIÓN GENERAL (parties-general.component)
    const generalErrors = this.validateGeneralSection();
    if (generalErrors.length > 0) {
      errors.push('• Información general: ' + generalErrors.join(', '));
    }

    // 2. VALIDAR ADDRESS (parties-address.component - todos los campos son requeridos)
    const addressErrors = this.validateAddressSection();
    if (addressErrors.length > 0) {
      errors.push('• Domicilio: ' + addressErrors.join(', '));
    }

    // 3. VALIDAR BENEFICIARIOS (solo si la sección está habilitada)
    if (this.showBeneficiariesSection) {
      const beneficiaryErrors = this.validateBeneficiariesSection();
      if (beneficiaryErrors.length > 0) {
        errors.push('• Beneficiarios: ' + beneficiaryErrors.join(', '));
      }
    }

    // Las demás secciones (contactPoint, additionalContactPoints) 
    // NO se validan porque no tienen campos obligatorios

    return {
      isValid: errors.length === 0,
      errors: errors
    };
  }

  // VALIDAR INFORMACIÓN GENERAL
  private validateGeneralSection(): string[] {
    const errors: string[] = [];

    // Validar nombre común (requerido)
    const name = this.partieForm.get('name')?.value;
    if (!name || name.toString().trim() === '') {
      errors.push('Nombre común');
    }

    // Validar que tenga al menos un rol (requerido)
    const roles = this.partieForm.get('roles')?.value;
    if (!roles || !Array.isArray(roles) || roles.length === 0) {
      errors.push('Debe seleccionar al menos un rol');
    }

    // Validar identifier (todos los campos son requeridos según parties-general)
    const identifier = this.partieForm.get('identifier') as FormGroup;
    if (!identifier) {
      errors.push('Información del identificador');
    } else {
      const identifierErrors = this.validateIdentifierSection(identifier);
      if (identifierErrors.length > 0) {
        errors.push(...identifierErrors);
      }
    }

    return errors;
  }

  // VALIDAR IDENTIFIER
  private validateIdentifierSection(identifier: FormGroup): string[] {
    const errors: string[] = [];

    // Campos siempre requeridos en identifier
    const requiredFields = [
      { field: 'legalPersonality', label: 'Personalidad jurídica' },
      { field: 'schema', label: 'Esquema' },
      { field: 'id', label: 'Identificador' },
      { field: 'legalName', label: 'Nombre legal' }
    ];

    requiredFields.forEach(({ field, label }) => {
      const value = identifier.get(field)?.value;
      if (!value || value.toString().trim() === '') {
        errors.push(label);
      }
    });

    // Campos requeridos solo para persona física
    const legalPersonality = identifier.get('legalPersonality')?.value;
    if (legalPersonality === 'fisica') {
      const personFields = [
        { field: 'givenName', label: 'Nombre de pila' },
        { field: 'patronymicName', label: 'Primer apellido' },
        { field: 'matronymicName', label: 'Segundo apellido' }
      ];

      personFields.forEach(({ field, label }) => {
        const value = identifier.get(field)?.value;
        if (!value || value.toString().trim() === '') {
          errors.push(label);
        }
      });
    }

    return errors;
  }

  // VALIDAR ADDRESS
  private validateAddressSection(): string[] {
    const errors: string[] = [];
    const address = this.partieForm.get('address') as FormGroup;

    // Si no existe el FormGroup de address, es requerido
    if (!address) {
      return ['Debe completar la información de domicilio'];
    }

    // Todos los campos son requeridos según parties-address.component
    const requiredAddressFields = [
      { field: 'streetAddress', label: 'Dirección' },
      { field: 'locality', label: 'Localidad' },
      { field: 'region', label: 'Región' },
      { field: 'postalCode', label: 'Código postal' },
      { field: 'countryName', label: 'País' }
    ];

    requiredAddressFields.forEach(({ field, label }) => {
      const value = address.get(field)?.value;
      if (!value || value.toString().trim() === '') {
        errors.push(label);
      }
    });

    return errors;
  }

  // VALIDAR BENEFICIARIOS
  private validateBeneficiariesSection(): string[] {
    const errors: string[] = [];
    const beneficialOwners = this.partieForm.get('beneficialOwners') as FormArray;

    // Si la sección está habilitada, debe tener al menos un beneficiario
    if (!beneficialOwners || beneficialOwners.length === 0) {
      return ['Debe agregar al menos un beneficiario para los roles supplier o tenderer'];
    }

    // Validar cada beneficiario según la estructura de parties-beneficial-owners.component
    beneficialOwners.controls.forEach((control, index) => {
      if (control instanceof FormGroup) {
        const beneficiaryErrors = this.validateSingleBeneficiary(control, index + 1);
        if (beneficiaryErrors.length > 0) {
          errors.push(...beneficiaryErrors);
        }
      }
    });

    return errors;
  }

  // VALIDAR UN SOLO BENEFICIARIO
  private validateSingleBeneficiary(beneficiary: FormGroup, beneficiaryNumber: number): string[] {
    const errors: string[] = [];

    // Campos básicos requeridos en beneficial owners
    const basicFields = [
      { field: 'name', label: 'Nombre' },
      { field: 'nationality', label: 'Nacionalidad' },
      { field: 'email', label: 'Email' },
      { field: 'telephone', label: 'Teléfono' },
      { field: 'faxNumber', label: 'Fax' }
    ];

    const basicErrors: string[] = [];
    basicFields.forEach(({ field, label }) => {
      const value = beneficiary.get(field)?.value;
      if (!value || value.toString().trim() === '') {
        basicErrors.push(label);
      }
    });

    // Validar identifier del beneficiario
    const identifier = beneficiary.get('identifier') as FormGroup;
    if (!identifier) {
      basicErrors.push('Identificador');
    } else {
      const scheme = identifier.get('scheme')?.value;
      const id = identifier.get('id')?.value;
      
      if (!scheme || scheme.toString().trim() === '') {
        basicErrors.push('Esquema del identificador');
      }
      if (!id || id.toString().trim() === '') {
        basicErrors.push('ID del identificador');
      }
    }

    // Validar address del beneficiario
    const address = beneficiary.get('address') as FormGroup;
    if (!address) {
      basicErrors.push('Dirección');
    } else {
      const addressFields = [
        { field: 'streetAddress', label: 'Dirección' },
        { field: 'locality', label: 'Localidad' },
        { field: 'region', label: 'Región' },
        { field: 'postalCode', label: 'Código postal' },
        { field: 'countryName', label: 'País' }
      ];

      addressFields.forEach(({ field, label }) => {
        const value = address.get(field)?.value;
        if (!value || value.toString().trim() === '') {
          basicErrors.push(label);
        }
      });
    }

    if (basicErrors.length > 0) {
      errors.push(`Beneficiario ${beneficiaryNumber} incompleto: ${basicErrors.join(', ')}`);
    }

    return errors;
  }

  // RESTO DE MÉTODOS ORIGINALES
  cancelPartie(): void {
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

  loadForm(data: any): void {
    data.forEach((partie: any) => {
      this.partiesArray.push(this.fb.control(partie));
    });
  }

  loadData(): void {
    this.api.getMethod(`/parties/${this.record_id}`).subscribe((d: any) => {
      const { parties, error, message } = d;

      if (error) {
        console.log('message: ', message);
      } else {
        // load forms
        if (parties !== null) this.loadForm(parties);
      }
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
    });

    this.initForm();
    this.loadData();
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

  saveData(): void {
    console.log('partiesForm', this.partiesForm.value);

    this.api
      .postMethod({ ...this.partiesForm.value }, `/parties/${this.record_id}`)
      .subscribe((r: any) => {
        console.log('r: ', r);
        if (r.err) {
          console.log('r: ', r);
        } else {
          this.initForm();
          this.loadData();
          // const id = r.data._id;
          // console.log('id: ', id);
          // this.router.navigate([`/planning/${id}`]);
        }
      });
  }
}