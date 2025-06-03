import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Language } from 'src/utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-parties-additional-contact-points',
  templateUrl: './parties-additional-contact-points.component.html',
  styleUrls: ['./parties-additional-contact-points.component.css'],
})
export class PartiesAdditionalContactPointsComponent implements OnInit {
  @Input() additionalContactPointsArray: Array<any> = [];
  @Output() addAdditionalContactPoints = new EventEmitter<any>();
  @Output() deleteAdditionalContactPoints = new EventEmitter<any>();

  additionalContactPointsForm!: FormGroup;

  optsLanguage = Language;
  optLanguage: string = '';

  mostrarSpinner = false;

  constructor(private fb: FormBuilder) {}

  get availableLanguageArray() {
    return this.additionalContactPointsForm.controls[
      'availableLanguage'
    ] as FormArray;
  }

  addAvailableLanguage(): void {
    if (!this.optLanguage) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Seleccione un idioma para agregarlo.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#dc3545',
      });
      return;
    }

    const exists = this.availableLanguageArray.value.includes(this.optLanguage);
    if (exists) {
      Swal.fire({
        icon: 'warning',
        title: 'Duplicado',
        text: 'El idioma ya ha sido agregado.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#ffc107',
      });
      return;
    }
    this.availableLanguageArray.push(this.fb.control(this.optLanguage));
    this.optLanguage = '';
  }

  deleteAvailableLanguage(index: number): void {
    this.availableLanguageArray.removeAt(index);
  }

  getLanguageData(code: string): any {
    return this.optsLanguage.find((e) => e.code === code);
  }

  ngOnInit(): void {
    this.initForm();
  }

  get type(): FormControl {
    return this.additionalContactPointsForm.get('type') as FormControl;
  }

  get name(): FormControl {
    return this.additionalContactPointsForm.get('name') as FormControl;
  }

  get givenName(): FormControl {
    return this.additionalContactPointsForm.get('givenName') as FormControl;
  }

  get patronymicName(): FormControl {
    return this.additionalContactPointsForm.get(
      'patronymicName'
    ) as FormControl;
  }

  get matronymicName(): FormControl {
    return this.additionalContactPointsForm.get(
      'matronymicName'
    ) as FormControl;
  }

  get email(): FormControl {
    return this.additionalContactPointsForm.get('email') as FormControl;
  }

  get telephone(): FormControl {
    return this.additionalContactPointsForm.get('telephone') as FormControl;
  }

  get faxNumber(): FormControl {
    return this.additionalContactPointsForm.get('faxNumber') as FormControl;
  }

  get url(): FormControl {
    return this.additionalContactPointsForm.get('url') as FormControl;
  }

  initForm(): void {
    this.additionalContactPointsForm = this.fb.group({
      type: [''],
      name: [''],
      givenName: [''],
      patronymicName: [''],
      matronymicName: [''],
      email: [''],
      telephone: [''],
      faxNumber: [''],
      url: [
        '',
        [
          Validators.pattern(
            /^https?:\/\/(?:[a-zA-Z0-9\-._~%!$&'()*+,;=:@]+|%[0-9A-Fa-f]{2})*(?:\/(?:[a-zA-Z0-9\-._~%!$&'()*+,;=:@]+|%[0-9A-Fa-f]{2})*)*(?:\?(?:[a-zA-Z0-9\-._~%!$&'()*+,;=:@/?]+|%[0-9A-Fa-f]{2})*)?(?:#(?:[a-zA-Z0-9\-._~%!$&'()*+,;=:@/?]+|%[0-9A-Fa-f]{2})*)?$/
          ),
        ],
      ],
      availableLanguage: this.fb.array([]),
    });
  }

  addNewConctactPoint(): void {
    this.mostrarSpinner = true;
    this.addAdditionalContactPoints.emit(this.additionalContactPointsForm);
    this.initForm();
    setTimeout(() => {
      this.mostrarSpinner = false;
      console.log('agregando al arreglo');
    }, 1000);
  }
  confirmAndDeleteConctactPoint(index: number): void {
    Swal.fire({
      text: '¿Deseas eliminar este punto de contacto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          text: 'El registro ha sido eliminado.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        this.deleteAdditionalContactPoints.emit(index);
      }
    });
  }
}
