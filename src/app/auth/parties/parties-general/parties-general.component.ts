import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService, IPartieList } from 'src/app/services/api.service';
import { PartyRole } from 'src/utils';
import OrganizationSchemes from 'src/utils/organizationsSchemes';

@Component({
  selector: 'app-parties-general',
  templateUrl: './parties-general.component.html',
  styleUrls: ['./parties-general.component.css'],
})
export class PartiesGeneralComponent implements OnInit {
  @Output() saveGeneral = new EventEmitter<any>();
  @Output() showBeneficiaries = new EventEmitter<boolean>();
  generalForm!: FormGroup;
  additionalIdentifiersForm!: FormGroup;

  record_id = null;

  rolesList = PartyRole;
  optRole: string = '';

  optMemberOf: string = '';
  memberOfList: any = [];

  showBeneficiariesSection: boolean = false;

  mostrarSpinner = false;

  organizationSchemes = OrganizationSchemes.filter(
    (scheme) => !scheme.deprecated
  );

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute
  ) {}

  getRoleByCode(code: string): any {
    return this.rolesList.find((e) => e.code === code);
  }

  get memberOfArray() {
    return this.generalForm.controls['memberOf'] as FormArray;
  }

  addMemberOf(): void {
    this.memberOfArray.push(this.fb.control(this.optMemberOf));
  }

  deleteMemberOf(index: number): void {
    this.memberOfArray.removeAt(index);
  }

  get roleArray() {
    return this.generalForm.controls['roles'] as FormArray;
  }

  private readonly allowed_roles = ['supplier', 'tenderer'];

  regresarBeneficiaries(rol: string): void {
    if (this.allowed_roles.includes(this.optRole)) {
      this.showBeneficiaries.emit(true);
      this.showBeneficiariesSection = true;
      console.log('emit');
      this.optRole = '';
    } else {
      this.showBeneficiaries.emit(false);
      this.showBeneficiariesSection = false;
      console.log('no emit');
    }
  }

  addRole(): void {
    this.roleArray.push(this.fb.control(this.optRole));
    this.regresarBeneficiaries(this.optRole);
  }

  deleteRole(index: number): void {
    this.roleArray.removeAt(index);
    this.regresarBeneficiaries(this.optRole);
  }

  get additionalIdentifiersArray() {
    return this.generalForm.controls['additionalIdentifiers'] as FormArray;
  }

  addAdditionalIdentifiers(): void {
    this.additionalIdentifiersArray.push(this.additionalIdentifiersForm);
    this.initAdditionalIdentifiersForm();
  }

  deleteAdditionalIdentifiers(index: number): void {
    this.additionalIdentifiersArray.removeAt(index);
  }

  // Método para controlar los campos de persona física
  private handlePersonaFields(isPersonaFisica: boolean): void {
    const fields = ['givenName', 'patronymicName', 'matronymicName'];
    const identifierGroup = this.generalForm.get('identifier');

    fields.forEach((field) => {
      const control = identifierGroup?.get(field);
      if (control) {
        if (isPersonaFisica) {
          control.enable();
        } else {
          control.disable();
          control.setValue('');
        }
      }
    });
  }

  ngOnInit(): void {
    this.initForm();

    // Listener para el cambio de esquema
    this.generalForm
      .get('identifier.schema')
      ?.valueChanges.subscribe((schemaCode) => {
        const selectedScheme = this.organizationSchemes.find(
          (scheme) => scheme.code === schemaCode
        );
        if (selectedScheme) {
          this.generalForm.get('identifier.uri')?.setValue(selectedScheme.url);
        }
      });

    // Suscribirse a cambios en legalPersonality
    this.generalForm
      .get('identifier.legalPersonality')
      ?.valueChanges.subscribe((value) => {
        this.handlePersonaFields(value === 'fisica');
      });

    // Deshabilitar campos por defecto
    this.handlePersonaFields(false);

    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
    });

    if (this.record_id) {
      this.api.getPartiesByType(this.record_id).subscribe((d: IPartieList) => {
        this.memberOfList = d.data;
      });
    }
  }

  initAdditionalIdentifiersForm(): void {
    this.additionalIdentifiersForm = this.fb.group({
      schema: ['', [Validators.required]],
      id: ['', [Validators.required]],
      uri: ['', [Validators.required]],
      legalName: ['', [Validators.required]],
    });

     // Listener para el cambio de schema
     this.additionalIdentifiersForm.get('schema')?.valueChanges.subscribe(schemaCode => {
      const selectedScheme = this.organizationSchemes.find(scheme => scheme.code === schemaCode);
      if (selectedScheme) {
        this.additionalIdentifiersForm.get('uri')?.setValue(selectedScheme.url);
      }
    });
  }

  initForm(): void {
    this.generalForm = this.fb.group({
      name: ['', [Validators.required]],
      position: ['', [Validators.required]],
      roles: this.fb.array([]),
      memberOf: this.fb.array([]),
      identifier: this.fb.group({
        legalPersonality: ['', Validators.required],
        schema: ['', [Validators.required]],
        id: ['', [Validators.required]],
        uri: ['', [Validators.required]],
        legalName: ['', [Validators.required]],
        givenName: ['', [Validators.required]],
        patronymicName: ['', [Validators.required]],
        matronymicName: ['', [Validators.required]],
      }),
      additionalIdentifiers: this.fb.array([]),
      details: this.fb.group({
        listedOnRegulatedMarket: [false, [Validators.required]],
      }),
    });

    this.initAdditionalIdentifiersForm();
  }

  save(): void {
    this.mostrarSpinner = true;
    this.saveGeneral.emit(this.generalForm);
    setTimeout(() => {
      this.mostrarSpinner = false;
      console.log('agregando al arreglo');
    }, 1000);
  }
}
