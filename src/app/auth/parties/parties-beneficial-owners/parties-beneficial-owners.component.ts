import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import Contries from 'src/utils/countries';
import Swal from 'sweetalert2';

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
  countries = Contries;
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

  get nationalities(): FormArray {
    return this.beneficialOwnersForm.get('nationalities') as FormArray;
  }

  initForm(): void {
    this.beneficialOwnersForm = this.fb.group({
      name: ['', [Validators.required]],
      identifier: this.fb.group({
        scheme: ['MX-RFC', [Validators.required]],
        id: ['', [Validators.required]],
      }),
      nationalities: this.fb.array(
        [
          this.fb.control('', [
            Validators.required,
            Validators.pattern('^[A-Z]{2}$'),
          ]),
        ],
        Validators.required
      ),
      email: ['', [Validators.required]],
      telephone: [null],
      faxNumber: [null],
      address: this.fb.group({
        streetAddress: ['', [Validators.required]],
        locality: ['', [Validators.required]],
        region: ['', [Validators.required]],
        postalCode: ['', [Validators.required]],
        countryName: ['', [Validators.required]],
      }),
    });
  }

  addNationality(): void {
    this.nationalities.push(this.fb.control(''));
  }

  removeNationality(index: number): void {
    this.nationalities.removeAt(index);
  }

  validateNationalitySelection(event: Event, index: number): void {
    const target = event.target as HTMLSelectElement;
    const selectedCode = target.value;

    const existingIndex = this.nationalities.value.findIndex(
      (code: string, i: number) => code === selectedCode && i !== index
    );

    if (existingIndex !== -1) {
      Swal.fire({
        icon: 'warning',
        title: 'Nacionalidad duplicada',
        text: 'Esta nacionalidad ya ha sido seleccionada. Por favor, elija una diferente.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#ffc107',
      });

      target.value = '';
      this.nationalities.at(index).setValue('');
      return;
    }

    this.nationalities.at(index).setValue(selectedCode);
  }

  // Método adicional para validar antes de agregar/guardar
  validateEmptyNationalities(): boolean {
    const emptyNationalities = this.nationalities.value.filter(
      (code: string) => !code || code.trim() === ''
    );

    if (emptyNationalities.length > 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Nacionalidades incompletas',
        text: 'Todas las nacionalidades deben tener un país seleccionado. Por favor, complete o elimine las nacionalidades vacías.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#ffc107',
      });
      return false;
    }

    return true;
  }

  addNewBeneficialOwners(): void {
    this.beneficialOwnersForm.markAllAsTouched();

    // Validar nacionalidades vacías
    if (!this.validateEmptyNationalities()) {
      return;
    }

    if (!this.isFormValid()) {
      const errors = this.getValidationErrors();

      // Crear lista HTML para SweetAlert2
      const errorsList = errors.map((error) => `${error}`).join('<br>');
      const htmlContent = `
    <p>Hay campos obligatorios sin llenar en la dirección.</p>
    <ul style="text-align: left;">
      <li>Revisa los campos marcados en rojo.</li>
      <li>Los mensajes de error están debajo de cada campo.</li>
    </ul>
  `;

      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        html: htmlContent,
        footer: 'Completa todos los campos requeridos antes de continuar.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#ffc107',
      });

      return;
    }

    this.addBeneficialOwners.emit(this.beneficialOwnersForm);
    Swal.fire({
      icon: 'success',
      title: 'Beneficiarios agregados',
      text: 'Los beneficiarios se han agregado exitosamente.',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#28a745',
      timer: 2000,
      timerProgressBar: true,
    });
  }

  private getValidationErrors(): string[] {
    const errors: string[] = [];

    if (this.nationalities.length === 0) {
      errors.push('• Debe agregar al menos una nacionalidad');
    }

    return errors;
  }

  private isFormValid(): boolean {
    if (this.nationalities.length === 0 || this.beneficialOwnersForm.invalid) {
      return false;
    }
    return true;
  }
}
