import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-parties-contact-point',
  templateUrl: './parties-contact-point.component.html',
  styleUrls: ['./parties-contact-point.component.css'],
})
export class PartiesContactPointComponent implements OnInit {
  @Output() saveContactPoint = new EventEmitter<any>();
  contactPointForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

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
      availableLanguage: ['availableLanguage', [Validators.required]],
    });
  }

  save(): void {
    this.saveContactPoint.emit(this.contactPointForm);
  }
}
