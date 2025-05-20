import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService, IPartieList } from 'src/app/services/api.service';
import { PartyRole } from 'src/utils';
import OrganizationSchemes from 'src/utils/organizationsSchemes';
import Swal from 'sweetalert2';

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
    // Validamos si el arreglo de actores está vacío
    if (!this.memberOfList || this.memberOfList.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'Sin Actores',
        text: 'No existen actores registrados para este proceso de contratación.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#0d6efd',
      });
      return;
    }
  
    // Validamos si se ha seleccionado un actor
    if (!this.optMemberOf) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Seleccione un actor para agregarlo.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#dc3545',
      });
      return;
    }
  
    // Validación de duplicado
    const yaExiste = this.memberOfArray.value.includes(this.optMemberOf);
    if (yaExiste) {
      Swal.fire({
        icon: 'warning',
        title: 'Duplicado',
        text: 'Este actor ya fue agregado como miembro.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#ffc107',
      });
      return;
    }
  
    // Si pasa todas las validaciones, agregar
    this.memberOfArray.push(this.fb.control(this.optMemberOf));
    this.optMemberOf = '';
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
    //validamos si se ha seleccionado un rol
    if (!this.optRole) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Seleccione un rol para agregarlo.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#dc3545',
      });
      return;
    }
    const existingRoles = this.roleArray.value; // obtiene los roles actuales

    if (existingRoles.includes(this.optRole)) {
      Swal.fire({
        icon: 'warning',
        title: 'Rol duplicado',
        text: 'El rol ya existe. No se puede agregar duplicado.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#ffc107' // alerta sweet vss
      });
      return;
    }
    

    this.roleArray.push(this.fb.control(this.optRole));
    this.regresarBeneficiaries(this.optRole);
    this.optRole = '';
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

      //  Ordenar roles alfabéticamente por título
    this.rolesList = this.rolesList.sort((a, b) => a.title.localeCompare(b.title));

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

  get add_schema(): FormControl {
    return this.additionalIdentifiersForm.get('schema') as FormControl;
  }

  get add_id(): FormControl {
    return this.additionalIdentifiersForm.get('id') as FormControl;
  }

  get add_uri(): FormControl {
    return this.additionalIdentifiersForm.get('uri') as FormControl;
  }

  get add_legalName(): FormControl {
    return this.additionalIdentifiersForm.get('legalName') as FormControl;
  }

  initAdditionalIdentifiersForm(): void {
    this.additionalIdentifiersForm = this.fb.group({
      schema: ['', [Validators.required]],
      id: ['', [Validators.required]],
      uri: ['', [Validators.required]],
      legalName: ['', [Validators.required]],
    });

    // Listener para el cambio de schema
    this.additionalIdentifiersForm
      .get('schema')
      ?.valueChanges.subscribe((schemaCode) => {
        const selectedScheme = this.organizationSchemes.find(
          (scheme) => scheme.code === schemaCode
        );
        if (selectedScheme) {
          this.additionalIdentifiersForm
            .get('uri')
            ?.setValue(selectedScheme.url);
        }
      });
  }

  get name(): FormControl {
    return this.generalForm.get('name') as FormControl;
  }

  get position(): FormControl {
    return this.generalForm.get('position') as FormControl;
  }

  get identifier(): FormGroup {
    return this.generalForm.get('identifier') as FormGroup;
  }

  get legalPersonality(): FormControl {
    return this.identifier.get('legalPersonality') as FormControl;
  }

  get schema(): FormControl {
    return this.identifier.get('schema') as FormControl;
  }

  get id(): FormControl {
    return this.identifier.get('id') as FormControl;
  }

  get uri(): FormControl {
    return this.identifier.get('uri') as FormControl;
  }

  get legalName(): FormControl {
    return this.identifier.get('legalName') as FormControl;
  }

  get givenName(): FormControl {
    return this.identifier.get('givenName') as FormControl;
  }

  get patronymicName(): FormControl {
    return this.identifier.get('patronymicName') as FormControl;
  }

  get matronymicName(): FormControl {
    return this.identifier.get('matronymicName') as FormControl;
  }

  initForm(): void {
    this.generalForm = this.fb.group({
      name: ['', [Validators.required]],
      position: [''],
      roles: this.fb.array([]),
      memberOf: this.fb.array([]),
      identifier: this.fb.group({
        legalPersonality: ['', Validators.required],
        schema: ['', [Validators.required]],
        id: ['', [Validators.required]],
        uri: [''],
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
