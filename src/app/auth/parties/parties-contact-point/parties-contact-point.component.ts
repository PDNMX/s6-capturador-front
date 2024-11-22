import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Language } from 'src/utils';

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
    this.availableLanguageArray.push(this.fb.control(this.optLanguage));
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
      url: ['', [Validators.required]],
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
