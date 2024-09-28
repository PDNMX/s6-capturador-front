import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-parties-general',
  templateUrl: './parties-general.component.html',
  styleUrls: ['./parties-general.component.css'],
})
export class PartiesGeneralComponent implements OnInit {
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
      name: ['', [Validators.required]],
      position: ['', [Validators.required]],
      roles: ['', [Validators.required]],
      identifier: this.fb.group({
        legalPersonality: ['', [Validators.required]],
        legalName: ['', [Validators.required]],
        givenName: ['', [Validators.required]],
        patronymicName: ['', [Validators.required]],
        matronymicName: ['', [Validators.required]],
      }),
    });
  }
}
