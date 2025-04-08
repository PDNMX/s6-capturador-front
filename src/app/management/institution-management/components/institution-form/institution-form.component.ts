import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Institution } from 'src/app/models/institutions';
import { InstitutionsService } from 'src/app/services/institutions.service';

@Component({
  selector: 'app-institution-form',
  templateUrl: './institution-form.component.html',
  styleUrls: ['./institution-form.component.css'],
})
export class InstitutionFormComponent implements OnInit {
  @Input() institution: Institution | null = null;
  @Output() close = new EventEmitter<void>();
  institutionForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private institutionsService: InstitutionsService
  ) {
    this.institutionForm = this.fb.group({
      name: ['', Validators.required],
      streetAddress: ['', Validators.required],
      locality: ['', Validators.required],
      region: ['', Validators.required],
      postalCode: ['', Validators.required],
      countryName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.institution) {
      this.institutionForm.patchValue({
        name: this.institution.name,
        streetAddress: this.institution.address.streetAddress,
        locality: this.institution.address.locality,
        region: this.institution.address.region,
        postalCode: this.institution.address.postalCode,
        countryName: this.institution.address.countryName,
      });
    }
  }

  save(): void {
    if (this.institutionForm.valid) {
      const institutionData: Institution = {
        name: this.institutionForm.value.name,
        address: {
          streetAddress: this.institutionForm.value.streetAddress,
          locality: this.institutionForm.value.locality,
          region: this.institutionForm.value.region,
          postalCode: this.institutionForm.value.postalCode,
          countryName: this.institutionForm.value.countryName,
        },
      };

      const request = this.institution?._id
        ? this.institutionsService.updateInstitution(
            this.institution._id,
            institutionData
          )
        : this.institutionsService.createInstitution(institutionData);

      request.subscribe(() => this.close.emit());
    }
  }

  closeModal(): void {
    this.close.emit();
  }
}
