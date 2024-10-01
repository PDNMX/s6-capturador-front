import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Language } from 'src/utils';

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
  optLanguaje: string = '';

  constructor(private fb: FormBuilder) {}

  get availableLanguageArray() {
    return this.additionalContactPointsForm.controls[
      'availableLanguage'
    ] as FormArray;
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
    this.additionalContactPointsForm = this.fb.group({
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

  addNewConctactPoint(): void {
    this.addAdditionalContactPoints.emit(this.additionalContactPointsForm);
    this.initForm();
  }
}
