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
  optLanguaje: string = '';

  constructor(private fb: FormBuilder) {}

  get availableLanguageArray() {
    return this.contactPointForm.controls['availableLanguage'] as FormArray;
  }

  addAvailableLanguage(): void {
    this.availableLanguageArray.push(this.fb.control(this.optLanguaje));
  }

  deleteAvailableLanguage(index: number): void {
    this.availableLanguageArray.removeAt(index);
  }

  getLanguajeData(code: string): any {
    return this.optsLanguage.find((e) => e.code === code);
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.contactPointForm = this.fb.group({
      type: ['type', [Validators.required]],
      name: ['name', [Validators.required]],
      givenName: ['givenName', [Validators.required]],
      patronymicName: ['patronymicName', [Validators.required]],
      matronymicName: ['matronymicName', [Validators.required]],
      email: ['email', [Validators.required]],
      telephone: ['telephone', [Validators.required]],
      faxNumber: ['faxNumber', [Validators.required]],
      url: ['url', [Validators.required]],
      availableLanguage: this.fb.array([]),
    });
  }

  save(): void {
    // console.log('this.contactPointForm: ', this.contactPointForm.value);
    this.saveContactPoint.emit(this.contactPointForm);
  }
}
