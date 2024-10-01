import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-parties-general',
  templateUrl: './parties-general.component.html',
  styleUrls: ['./parties-general.component.css'],
})
export class PartiesGeneralComponent implements OnInit {
  @Output() saveGeneral = new EventEmitter<any>();
  generalForm!: FormGroup;

  rolesList = [
    {
      id: '',
      label: '',
    },
  ];

  onSubmit(): void {}
  onRoleChange(): void {}

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.generalForm = this.fb.group({
      name: ['name', [Validators.required]],
      position: ['position', [Validators.required]],
      roles: ['roles', [Validators.required]],
      identifier: this.fb.group({
        legalPersonality: ['legalPersonality', [Validators.required]],
        legalName: ['legalName', [Validators.required]],
        givenName: ['givenName', [Validators.required]],
        patronymicName: ['patronymicName', [Validators.required]],
        matronymicName: ['matronymicName', [Validators.required]],
      }),
    });
  }

  save(): void {
    this.saveGeneral.emit(this.generalForm);
  }
}
