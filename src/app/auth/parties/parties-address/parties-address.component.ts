import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import Countries from 'src/utils/countries';
import Swal from 'sweetalert2';

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

  get streetAddress(): FormControl {
    return this.addressForm.get('streetAddress') as FormControl;
  }

  get locality(): FormControl {
    return this.addressForm.get('locality') as FormControl;
  }

  get region(): FormControl {
    return this.addressForm.get('region') as FormControl;
  }

  get postalCode(): FormControl {
    return this.addressForm.get('postalCode') as FormControl;
  }

  get countryName(): FormControl {
    return this.addressForm.get('countryName') as FormControl;
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
    this.addressForm.markAllAsTouched();

    if (this.addressForm.invalid) {
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

    this.saveAddress.emit(this.addressForm);

    Swal.fire({
      icon: 'success',
      title: 'Dirección guardada',
      text: 'La información de dirección se ha guardado exitosamente.',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#28a745',
      timer: 2000,
      timerProgressBar: true,
    });

    console.log('agregando al arreglo');
  }
}
