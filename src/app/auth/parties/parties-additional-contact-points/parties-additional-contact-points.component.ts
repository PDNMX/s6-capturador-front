import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {}

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
      availableLanguage: ['availableLanguage', [Validators.required]],
    });
  }

  addNewConctactPoint(): void {
    this.addAdditionalContactPoints.emit(this.additionalContactPointsForm);
    this.initForm();
  }
}
