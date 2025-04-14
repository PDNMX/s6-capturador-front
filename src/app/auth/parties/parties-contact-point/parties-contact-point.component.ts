import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  selector: 'app-parties-contact-point',
  templateUrl: './parties-contact-point.component.html',
  styleUrls: ['./parties-contact-point.component.css'],
})
export class PartiesContactPointComponent implements OnInit {
  @Output() saveContactPoint = new EventEmitter<any>();
  contactPointForm!: FormGroup;

  optsLanguage = Language;
  optLanguage: string = '';
  mostrarSpinner = false;
  constructor(private fb: FormBuilder) {}

  get availableLanguageArray() {
    return this.contactPointForm.controls['availableLanguage'] as FormArray;
  }

  addAvailableLanguage(): void {
    if(!this.optLanguage){
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
    return this.contactPointForm.get('type') as FormControl;
  }

  get name(): FormControl {
    return this.contactPointForm.get('name') as FormControl;
  }

  get givenName(): FormControl {
    return this.contactPointForm.get('givenName') as FormControl;
  }

  get patronymicName(): FormControl {
    return this.contactPointForm.get('patronymicName') as FormControl;
  }

  get matronymicName(): FormControl {
    return this.contactPointForm.get('matronymicName') as FormControl;
  }

  get email(): FormControl {
    return this.contactPointForm.get('email') as FormControl;
  }

  get telephone(): FormControl {
    return this.contactPointForm.get('telephone') as FormControl;
  }

  get faxNumber(): FormControl {
    return this.contactPointForm.get('faxNumber') as FormControl;
  }

  get url(): FormControl {
    return this.contactPointForm.get('url') as FormControl;
  }

  initForm(): void {
    this.contactPointForm = this.fb.group({
      type: ['', [Validators.required]],
      name: ['', [Validators.required]],
      givenName: ['', [Validators.required]],
      patronymicName: ['', [Validators.required]],
      matronymicName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      faxNumber: ['', [Validators.required]],
      url:  [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^https?:\/\/(?:[a-zA-Z0-9\-._~%!$&'()*+,;=:@]+|%[0-9A-Fa-f]{2})*(?:\/(?:[a-zA-Z0-9\-._~%!$&'()*+,;=:@]+|%[0-9A-Fa-f]{2})*)*(?:\?(?:[a-zA-Z0-9\-._~%!$&'()*+,;=:@/?]+|%[0-9A-Fa-f]{2})*)?(?:#(?:[a-zA-Z0-9\-._~%!$&'()*+,;=:@/?]+|%[0-9A-Fa-f]{2})*)?$/
          ),
        ],
      ],
      availableLanguage: this.fb.array([]),
    });
  }

  save(): void {
    // console.log('this.contactPointForm: ', this.contactPointForm.value);
    this.mostrarSpinner = true;
    this.saveContactPoint.emit(this.contactPointForm);
    setTimeout(() => {
      this.mostrarSpinner = false;
      console.log('agregando al arreglo');
    }, 1000);
  }
}
