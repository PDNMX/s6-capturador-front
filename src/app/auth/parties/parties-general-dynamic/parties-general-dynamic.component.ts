import { Component, EventEmitter, Input, OnInit, OnChanges, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService, IPartieList } from 'src/app/services/api.service';
import PartyRole, { getRoleTitle } from 'src/utils/partyRole';
import OrganizationSchemes from 'src/utils/organizationsSchemes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-parties-general-dynamic',
  templateUrl: './parties-general-dynamic.component.html',
  styleUrls: ['./parties-general-dynamic.component.css'],
})
export class PartiesGeneralDynamicComponent implements OnInit, OnChanges {
  @Input() selectedActor: string = '';
  @Input() fieldVisibility: any = {};
  @Output() saveGeneral = new EventEmitter<any>();

  generalForm!: FormGroup;
  record_id = null;

  rolesList = PartyRole;
  optRole: string = '';
  optMemberOf: string = '';
  memberOfList: any = [];
  showAdditionalRoleSelector: boolean = false;

  organizationSchemes = OrganizationSchemes.filter(
    (scheme) => !scheme.deprecated
  );

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(): void {
    // Cada vez que cambie el actor seleccionado, reiniciar el formulario
    if (this.selectedActor) {
      this.initForm();
      this.setupFormForSelectedActor();
    }
  }

  private setupFormForSelectedActor(): void {
    // Preseleccionar automáticamente el rol del actor
    if (this.selectedActor) {
      // Limpiar el array de roles primero
      this.roleArray.clear();
      // Agregar el rol principal
      this.roleArray.push(this.fb.control(this.selectedActor));
      // Resetear selector de roles adicionales
      this.showAdditionalRoleSelector = false;
      this.optRole = '';
    }

    // Configurar validaciones condicionales después de inicializar
    setTimeout(() => {
      this.setupConditionalValidations();
    });

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

    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
    });

    if (this.record_id) {
      this.api.getPartiesByType(this.record_id).subscribe((d: IPartieList) => {
        this.memberOfList = d.data;
      });
    }
  }

  // Alternar selector de roles adicionales
  toggleAdditionalRoleSelector(): void {
    this.showAdditionalRoleSelector = !this.showAdditionalRoleSelector;
    if (!this.showAdditionalRoleSelector) {
      this.optRole = '';
    }
  }

  // Obtener roles disponibles filtrados según el tab activo y excluyendo roles ya seleccionados
  getAvailableRoles(): any[] {
    const existingRoles = this.roleArray.value;
    
    // Determinar qué lista usar según el tipo de actor principal
    let availableRoles: any[] = [];
    
    if (this.isInternalActor(this.selectedActor)) {
      // Si es actor interno, mostrar solo roles internos
      availableRoles = this.rolesList.filter(role => 
        this.isInternalActor(role.code)
      );
    } else {
      // Si es actor externo, mostrar solo roles externos
      availableRoles = this.rolesList.filter(role => 
        !this.isInternalActor(role.code)
      );
    }
    
    // Filtrar roles que ya están seleccionados
    return availableRoles.filter(role => 
      !existingRoles.includes(role.code)
    );
  }

  // Verificar si un rol es interno
  private isInternalActor(roleCode: string): boolean {
    const internalCodes = [
      'buyer', 'procuringEntity', 'procuringArea', 
      'techArea', 'contractAdmin', 'payer', 'reviewBody'
    ];
    return internalCodes.includes(roleCode);
  }

  // Configurar validaciones según campos visibles
  private setupConditionalValidations(): void {
    // Limpiar validaciones existentes
    this.generalForm.clearValidators();
    
    // Validaciones para información general
    if (this.shouldShowField('name')) {
      const nameControl = this.generalForm.get('name');
      nameControl?.setValidators([Validators.required]);
      nameControl?.updateValueAndValidity();
    }

    // Validaciones para identifier
    if (this.shouldShowField('identifier')) {
      const identifierGroup = this.generalForm.get('identifier') as FormGroup;
      
      if (this.shouldShowField('legalPersonality')) {
        const control = identifierGroup.get('legalPersonality');
        control?.setValidators([Validators.required]);
        control?.updateValueAndValidity();
      }
      
      if (this.shouldShowField('legalName')) {
        const control = identifierGroup.get('legalName');
        control?.setValidators([Validators.required]);
        control?.updateValueAndValidity();
      }
      
      if (this.shouldShowField('schema')) {
        const control = identifierGroup.get('schema');
        control?.setValidators([Validators.required]);
        control?.updateValueAndValidity();
      }
      
      if (this.shouldShowField('id')) {
        const control = identifierGroup.get('id');
        control?.setValidators([Validators.required]);
        control?.updateValueAndValidity();
      }

      // Validaciones condicionales para persona física
      if (this.shouldShowField('givenName')) {
        const control = identifierGroup.get('givenName');
        control?.setValidators([Validators.required]);
        control?.updateValueAndValidity();
      }
      
      if (this.shouldShowField('patronymicName')) {
        const control = identifierGroup.get('patronymicName');
        control?.setValidators([Validators.required]);
        control?.updateValueAndValidity();
      }
      
      if (this.shouldShowField('matronymicName')) {
        const control = identifierGroup.get('matronymicName');
        control?.setValidators([Validators.required]);
        control?.updateValueAndValidity();
      }
    }

    // Actualizar validaciones del formulario completo
    this.generalForm.updateValueAndValidity();
  }

  // Verificar si se debe mostrar un campo
  shouldShowField(fieldName: string): boolean {
    return this.fieldVisibility[fieldName] === true;
  }

  // Verificar si se deben mostrar campos de persona física
  shouldShowPersonFields(): boolean {
    const legalPersonality = this.generalForm.get('identifier.legalPersonality')?.value;
    return (
      legalPersonality === 'fisica' && 
      (this.shouldShowField('givenName') || 
       this.shouldShowField('patronymicName') || 
       this.shouldShowField('matronymicName'))
    );
  }

  // Método para controlar los campos de persona física
  private handlePersonaFields(isPersonaFisica: boolean): void {
    const fields = ['givenName', 'patronymicName', 'matronymicName'];
    const identifierGroup = this.generalForm.get('identifier');

    fields.forEach((field) => {
      const control = identifierGroup?.get(field);
      if (control && this.shouldShowField(field)) {
        if (isPersonaFisica) {
          control.enable();
          control.setValidators([Validators.required]);
        } else {
          control.disable();
          control.setValue('');
          control.clearValidators();
        }
        control.updateValueAndValidity();
      }
    });
  }

  // Métodos para roles
  get roleArray() {
    return this.generalForm.controls['roles'] as FormArray;
  }

  getRoleByCode(code: string): any {
    return this.rolesList.find((e) => e.code === code);
  }

  getRoleTitle(code: string): string {
    return getRoleTitle(code);
  }

  getRoleDescription(code: string): string {
    return this.getRoleByCode(code)?.description || '';
  }

  addRole(): void {
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

    const existingRoles = this.roleArray.value;
    if (existingRoles.includes(this.optRole)) {
      Swal.fire({
        icon: 'warning',
        title: 'Rol duplicado',
        text: 'El rol ya existe. No se puede agregar duplicado.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#ffc107'
      });
      return;
    }

    // Verificar que el rol corresponda al tipo de actor
    const isSelectedActorInternal = this.isInternalActor(this.selectedActor);
    const isNewRoleInternal = this.isInternalActor(this.optRole);
    
    if (isSelectedActorInternal !== isNewRoleInternal) {
      const actorType = isSelectedActorInternal ? 'interno' : 'externo';
      const roleType = isNewRoleInternal ? 'interno' : 'externo';
      
      Swal.fire({
        icon: 'warning',
        title: 'Tipo de rol incompatible',
        text: `No puedes agregar un rol ${roleType} a un actor ${actorType}.`,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#ffc107'
      });
      return;
    }

    this.roleArray.push(this.fb.control(this.optRole));
    this.optRole = '';
    
    // Cerrar el selector si no hay más roles disponibles
    if (this.getAvailableRoles().length === 0) {
      this.showAdditionalRoleSelector = false;
      Swal.fire({
        icon: 'success',
        title: 'Rol agregado',
        text: 'No hay más roles disponibles para este tipo de actor.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#28a745',
        timer: 2000,
        timerProgressBar: true
      });
    }
  }

  deleteRole(index: number): void {
    const roleToDelete = this.roleArray.at(index).value;
    
    // No permitir eliminar el rol principal
    if (roleToDelete === this.selectedActor) {
      Swal.fire({
        icon: 'warning',
        title: 'Rol principal',
        text: 'No se puede eliminar el rol principal del actor.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#ffc107'
      });
      return;
    }

    this.roleArray.removeAt(index);
  }

  // Métodos para miembros
  get memberOfArray() {
    return this.generalForm.controls['memberOf'] as FormArray;
  }

  addMemberOf(): void {
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

    this.memberOfArray.push(this.fb.control(this.optMemberOf));
    this.optMemberOf = '';
  }

  deleteMemberOf(index: number): void {
    this.memberOfArray.removeAt(index);
  }

  // Getters para controles del formulario
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

  // Inicialización del formulario
  initForm(): void {
    this.generalForm = this.fb.group({
      name: [''],
      position: [''],
      roles: this.fb.array([]),
      memberOf: this.fb.array([]),
      identifier: this.fb.group({
        legalPersonality: [''],
        schema: [''],
        id: [''],
        uri: [''],
        legalName: [''],
        givenName: [''],
        patronymicName: [''],
        matronymicName: [''],
      }),
      details: this.fb.group({
        listedOnRegulatedMarket: [false],
      }),
    });
  }

  // Guardar información general
  save(): void {
    // Marcar todos los campos como tocados para mostrar errores
    this.generalForm.markAllAsTouched();

    // Validar usando la lógica mejorada
    if (!this.isFormValid()) {
      const errors = this.getValidationErrors();
      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        html: `Debes completar la información requerida:<br><br>${errors.join('<br>')}`,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#ffc107',
      });
      return;
    }

    this.saveGeneral.emit(this.generalForm);
    
    Swal.fire({
      icon: 'success',
      title: 'Información guardada',
      text: 'La información general ha sido guardada exitosamente.',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#28a745',
      timer: 2000,
      timerProgressBar: true
    });
  }

  // Obtener errores de validación específicos
  private getValidationErrors(): string[] {
    const errors: string[] = [];

    // Validar roles (siempre requerido)
    if (this.roleArray.length === 0) {
      errors.push('• Debe seleccionar al menos un rol');
    }

    // Validar campos visibles
    if (this.shouldShowField('name') && !this.name.value?.trim()) {
      errors.push('• Nombre común es requerido');
    }

    if (this.shouldShowField('identifier')) {
      if (this.shouldShowField('legalPersonality') && !this.legalPersonality.value) {
        errors.push('• Personalidad jurídica es requerida');
      }
      
      if (this.shouldShowField('legalName') && !this.legalName.value?.trim()) {
        errors.push('• Nombre legal es requerido');
      }
      
      if (this.shouldShowField('schema') && !this.schema.value?.trim()) {
        errors.push('• Esquema es requerido');
      }
      
      if (this.shouldShowField('id') && !this.id.value?.trim()) {
        errors.push('• Identificador es requerido');
      }

      // Validar campos de persona física si aplica
      const isPersonaFisica = this.legalPersonality.value === 'fisica';
      if (isPersonaFisica) {
        if (this.shouldShowField('givenName') && !this.givenName.value?.trim()) {
          errors.push('• Nombre de pila es requerido');
        }
        
        if (this.shouldShowField('patronymicName') && !this.patronymicName.value?.trim()) {
          errors.push('• Primer apellido es requerido');
        }
        
        if (this.shouldShowField('matronymicName') && !this.matronymicName.value?.trim()) {
          errors.push('• Segundo apellido es requerido');
        }
      }
    }

    return errors;
  }

  // Validación personalizada del formulario
  private isFormValid(): boolean {
    // Validar roles (siempre requerido)
    if (this.roleArray.length === 0) {
      return false;
    }

    // Validar campos visibles
    if (this.shouldShowField('name') && !this.name.value?.trim()) {
      return false;
    }

    if (this.shouldShowField('identifier')) {
      if (this.shouldShowField('legalPersonality') && !this.legalPersonality.value) {
        return false;
      }
      
      if (this.shouldShowField('legalName') && !this.legalName.value?.trim()) {
        return false;
      }
      
      if (this.shouldShowField('schema') && !this.schema.value?.trim()) {
        return false;
      }
      
      if (this.shouldShowField('id') && !this.id.value?.trim()) {
        return false;
      }

      // Validar campos de persona física si aplica
      const isPersonaFisica = this.legalPersonality.value === 'fisica';
      if (isPersonaFisica) {
        if (this.shouldShowField('givenName') && !this.givenName.value?.trim()) {
          return false;
        }
        
        if (this.shouldShowField('patronymicName') && !this.patronymicName.value?.trim()) {
          return false;
        }
        
        if (this.shouldShowField('matronymicName') && !this.matronymicName.value?.trim()) {
          return false;
        }
      }
    }

    return true;
  }
}