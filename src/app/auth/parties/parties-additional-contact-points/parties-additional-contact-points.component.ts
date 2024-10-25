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
  optLanguage: string = '';

  constructor(private fb: FormBuilder) {}

  get availableLanguageArray() {
    return this.additionalContactPointsForm.controls[
      'availableLanguage'
    ] as FormArray;
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
    this.additionalContactPointsForm = this.fb.group({
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

  addNewConctactPoint(): void {
    this.addAdditionalContactPoints.emit(this.additionalContactPointsForm);
    this.initForm();
  }
}
