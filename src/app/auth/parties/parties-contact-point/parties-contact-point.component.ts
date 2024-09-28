import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-parties-contact-point',
  templateUrl: './parties-contact-point.component.html',
  styleUrls: ['./parties-contact-point.component.css'],
})
export class PartiesContactPointComponent implements OnInit {
  contactPointForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.contactPointForm = this.fb.group({
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
