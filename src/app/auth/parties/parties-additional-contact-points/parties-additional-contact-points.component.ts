import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-parties-additional-contact-points',
  templateUrl: './parties-additional-contact-points.component.html',
  styleUrls: ['./parties-additional-contact-points.component.css'],
})
export class PartiesAdditionalContactPointsComponent implements OnInit {
  additionalContactPointsForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.additionalContactPointsForm = this.fb.group({
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      givenName: ['', [Validators.required]],
      patronymicName: ['', [Validators.required]],
      matronymicName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      faxNumber: ['', [Validators.required]],
      url: ['', [Validators.required]],
      availableLanguage: ['', [Validators.required]],
    });
  }
}
