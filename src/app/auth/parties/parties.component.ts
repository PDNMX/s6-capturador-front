import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { getRoleTitle } from 'src/utils/partyRole';
import PartyRole from 'src/utils/partyRole';
import Swal from 'sweetalert2';

declare var bootstrap: any;

@Component({
  selector: 'app-parties',
  templateUrl: './parties.component.html',
  styleUrls: ['./parties.component.css'],
})
export class PartiesComponent implements OnInit {
  record_id = null;
  partiesForm!: FormGroup;
  partieForm!: FormGroup;

  // Datos para modal dinámica
  rolesList = PartyRole;
  selectedActor: string = '';
  selectedActorTitle: string = '';
  fieldVisibility: any = {};
  showAdditionalIdentifiersSection: boolean = false;
  editMode: boolean = false; // Variable para controlar cuándo mostrar componentes hijos
  
  // Nueva variable para el actor seleccionado para mostrar la tabla
  selectedActorForTable: any = null;

  // Clasificación de actores internos y externos
  private internalActorCodes = [
    'buyer',           // Comprador
    'procuringEntity', // Entidad contratante
    'procuringArea',   // Área requirente
    'techArea',        // Área técnica
    'contractAdmin',   // Administrador del contrato
    'payer',           // Emisor del pago
    'reviewBody'       // Órgano de revisión
  ];

  private externalActorCodes = [
    'supplier',        // Proveedor
    'tenderer',        // Licitante
    'funder',          // Entidad financiera
    'enquirer',        // Persona que solicita información
    'payee',           // Receptor del pago
    'interestedParty', // Parte interesada
    'guarantor'        // Institución que expide la garantía
  ];

  // Getters para las listas filtradas
  get internalActors() {
    return this.rolesList.filter(role => this.internalActorCodes.includes(role.code));
  }

  get externalActors() {
    return this.rolesList.filter(role => this.externalActorCodes.includes(role.code));
  }

  // Método para verificar si un actor es interno
  isInternalActor(actorCode: string): boolean {
    return this.internalActorCodes.includes(actorCode);
  }

  // Método para obtener el índice global del actor (para IDs únicos)
  getActorIndex(actorCode: string): number {
    return this.rolesList.findIndex(role => role.code === actorCode);
  }

  // NUEVO: Método para seleccionar un actor específico y mostrar su tabla
  selectActor(actorCode: string): void {
    const actor = this.rolesList.find(role => role.code === actorCode);
    if (actor) {
      this.selectedActorForTable = actor;
    }
  }

  // NUEVO: Método para limpiar la selección de actor
  clearSelectedActor(): void {
    this.selectedActorForTable = null;
  }

  // NUEVO: Método para obtener actores por rol específico
  getPartiesByRole(roleCode: string): any[] {
    if (!this.partiesForm.value.parties) {
      return [];
    }

    return this.partiesForm.value.parties.filter((party: any) => {
      if (!party.roles || !Array.isArray(party.roles)) {
        return false;
      }
      // Verificar si el actor tiene el rol específico
      return party.roles.includes(roleCode);
    });
  }

  // Método para filtrar actores registrados por tipo (mantenido para el resumen)
  getFilteredParties(type: 'internal' | 'external'): any[] {
    if (!this.partiesForm.value.parties) {
      return [];
    }

    return this.partiesForm.value.parties.filter((party: any) => {
      if (!party.roles || !Array.isArray(party.roles)) {
        return false;
      }

      // Verificar si algún rol del actor pertenece al tipo solicitado
      return party.roles.some((role: string) => {
        if (type === 'internal') {
          return this.internalActorCodes.includes(role);
        } else {
          return this.externalActorCodes.includes(role);
        }
      });
    });
  }

  // Método para obtener el índice original del actor en el array completo
  getOriginalIndex(item: any): number {
    const allParties = this.partiesForm.value.parties;
    return allParties.findIndex((party: any) => 
      party.name === item.name && 
      party.identifier?.id === item.identifier?.id &&
      JSON.stringify(party.roles) === JSON.stringify(item.roles)
    );
  }

  // Método para verificar si un actor tiene roles mixtos (interno y externo)
  hasMultipleActorTypes(party: any): boolean {
    if (!party.roles || !Array.isArray(party.roles)) {
      return false;
    }

    const hasInternal = party.roles.some((role: string) => this.internalActorCodes.includes(role));
    const hasExternal = party.roles.some((role: string) => this.externalActorCodes.includes(role));
    
    return hasInternal && hasExternal;
  }

  // Matriz de visibilidad de campos según el actor
  private actorFieldMatrix: { [key: string]: { [key: string]: boolean } } = {
    procuringEntity: {
      roles: true,
      name: true,
      identifier: true,
      legalPersonality: true,
      schema: true,
      id: true,
      legalName: true,
      givenName: false,
      patronymicName: false,
      matronymicName: false,
      uri: true,
      additionalIdentifiers: true,
      address: true,
      contactPoint: true,
      additionalContactPoints: true,
      beneficialOwners: false,
      details: true
    },
    procuringArea: {
      roles: true,
      name: true,
      identifier: true,
      legalPersonality: true,
      schema: true,
      id: true,
      legalName: true,
      givenName: false,
      patronymicName: false,
      matronymicName: false,
      uri: true,
      additionalIdentifiers: true,
      address: true,
      contactPoint: true,
      additionalContactPoints: true,
      beneficialOwners: false,
      details: true
    },
    techArea: {
      roles: true,
      name: true,
      identifier: true,
      legalPersonality: true,
      schema: true,
      id: true,
      legalName: true,
      givenName: false,
      patronymicName: false,
      matronymicName: false,
      uri: true,
      additionalIdentifiers: true,
      address: true,
      contactPoint: true,
      additionalContactPoints: true,
      beneficialOwners: false,
      details: true
    },
    contractAdmin: {
      roles: true,
      name: true,
      identifier: true,
      legalPersonality: true,
      schema: true,
      id: true,
      legalName: true,
      givenName: true,
      patronymicName: true,
      matronymicName: true,
      uri: true,
      additionalIdentifiers: true,
      address: true,
      contactPoint: true,
      additionalContactPoints: true,
      beneficialOwners: false,
      details: true
    },
    buyer: {
      roles: true,
      name: true,
      identifier: true,
      legalPersonality: true,
      schema: true,
      id: true,
      legalName: true,
      givenName: true,
      patronymicName: true,
      matronymicName: true,
      uri: true,
      additionalIdentifiers: true,
      address: true,
      additionalContactPoints: false, // buyer no debe tener puntos de contacto adicionales
      beneficialOwners: false,
      details: true
    },
    payer: {
      roles: true,
      name: true,
      identifier: true,
      legalPersonality: true,
      schema: true,
      id: true,
      legalName: true,
      givenName: true,
      patronymicName: true,
      matronymicName: true,
      uri: true,
      additionalIdentifiers: true,
      address: true,
      contactPoint: true,
      additionalContactPoints: true,
      beneficialOwners: false,
      details: true
    },
    funder: {
      roles: true,
      name: true,
      identifier: true,
      legalPersonality: true,
      schema: true,
      id: true,
      legalName: true,
      givenName: true,
      patronymicName: true,
      matronymicName: true,
      uri: true,
      additionalIdentifiers: true,
      address: true,
      contactPoint: true,
      additionalContactPoints: true,
      beneficialOwners: false,
      details: true
    },
    tenderer: {
      roles: true,
      name: true,
      identifier: true,
      legalPersonality: true,
      schema: true,
      id: true,
      legalName: true,
      givenName: true,
      patronymicName: true,
      matronymicName: true,
      uri: true,
      additionalIdentifiers: true,
      address: true,
      contactPoint: true,
      additionalContactPoints: true,
      beneficialOwners: false,
      details: true
    },
    reviewBody: {
      roles: true,
      name: true,
      identifier: true,
      legalPersonality: true,
      schema: true,
      id: true,
      legalName: true,
      givenName: true,
      patronymicName: true,
      matronymicName: true,
      uri: true,
      additionalIdentifiers: true,
      address: true,
      contactPoint: true,
      additionalContactPoints: true,
      beneficialOwners: false,
      details: true
    },
    interestedParty: {
      roles: true,
      name: true,
      identifier: true,
      legalPersonality: true,
      schema: true,
      id: true,
      legalName: true,
      givenName: true,
      patronymicName: true,
      matronymicName: true,
      uri: true,
      additionalIdentifiers: true,
      address: true,
      additionalContactPoints: true,
      beneficialOwners: false,
      details: true
    },
    enquirer: {
      roles: true,
      name: true,
      identifier: true,
      legalPersonality: true,
      schema: true,
      id: true,
      legalName: true,
      givenName: true,
      patronymicName: true,
      matronymicName: true,
      uri: true,
      additionalIdentifiers: true,
      address: true,
      contactPoint: true,
      additionalContactPoints: true,
      beneficialOwners: false,
      details: true
    },
    supplier: {
      roles: true,
      name: true,
      identifier: true,
      legalPersonality: true,
      schema: true,
      id: true,
      legalName: true,
      givenName: true,
      patronymicName: true,
      matronymicName: true,
      uri: true,
      additionalIdentifiers: true,
      address: true,
      contactPoint: true,
      additionalContactPoints: true,
      beneficialOwners: false,
      details: true
    },
    payee: {
      roles: true,
      name: true,
      identifier: true,
      legalPersonality: true,
      schema: true,
      id: true,
      legalName: true,
      givenName: true,
      patronymicName: true,
      matronymicName: true,
      uri: true,
      additionalIdentifiers: true,
      address: true,
      contactPoint: true,
      additionalContactPoints: true,
      beneficialOwners: true,
      details: true
    },
    guarantor: {
      roles: true,
      name: true,
      identifier: true,
      legalPersonality: true,
      schema: true,
      id: true,
      legalName: true,
      givenName: true,
      patronymicName: true,
      matronymicName: true,
      uri: true,
      additionalIdentifiers: true,
      address: true,
      contactPoint: true,
      additionalContactPoints: true,
      beneficialOwners: false,
      details: true
    }
  };

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
    });

    this.initForm();
    this.loadData();
  }

  // Abrir modal para actor específico
  openActorModal(actorCode: string): void {
    this.selectedActor = actorCode;
    this.selectedActorTitle = this.getRoleTitle(actorCode);
    this.fieldVisibility = this.actorFieldMatrix[actorCode] || {};
    
    // IMPORTANTE: Reiniciar completamente el formulario para que sea independiente
    this.initPartieForm();
    
    // Resetear estado de secciones adicionales
    this.showAdditionalIdentifiersSection = false;
    
    // Habilitar modo edición para mostrar componentes hijos
    this.editMode = true;
    
    // Abrir modal
    const modalElement = document.getElementById('actorModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
    
    // Listener para cuando se cierre la modal
    modalElement?.addEventListener('hidden.bs.modal', () => {
      this.editMode = false;
      this.selectedActor = '';
      this.selectedActorTitle = '';
      this.fieldVisibility = {};
      this.showAdditionalIdentifiersSection = false;
    });
  }

  // Verificar si se debe mostrar un campo
  shouldShowField(fieldName: string): boolean {
    return this.fieldVisibility[fieldName] === true;
  }

  // Guardar actor completo
  saveActor(): void {
    // Primero marcar todos los formularios como tocados
    this.partieForm.markAllAsTouched();
    
    // Validar todas las secciones
    const validation = this.validateActorForm();
    
    console.log('Validación resultado:', validation);
    console.log('Datos del formulario:', this.partieForm.value);
    
    if (!validation.isValid) {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        html: `Debes completar la información requerida:<br><br>${validation.errors.join('<br>')}`,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#ffc107',
      });
      return;
    }

    // Agregar el actor al array
    this.partiesArray.push(this.partieForm);
    this.saveData();
    
    // Cerrar modal
    const modalElement = document.getElementById('actorModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
    
    // Reiniciar formulario
    this.initPartieForm();
    
    Swal.fire({
      icon: 'success',
      title: 'Actor guardado',
      text: 'El actor ha sido agregado exitosamente.',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#28a745',
    });
  }

  // Validación específica para el actor actual
  private validateActorForm(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    console.log('Validando formulario:', this.partieForm.value);
    console.log('Campos visibles:', this.fieldVisibility);

    // 1. VALIDAR INFORMACIÓN GENERAL 
    const generalErrors = this.validateGeneralSection();
    if (generalErrors.length > 0) {
      errors.push('• Información general: ' + generalErrors.join(', '));
    }

    // 2. VALIDAR ADDRESS (si es visible)
    if (this.shouldShowField('address')) {
      const addressErrors = this.validateAddressSection();
      if (addressErrors.length > 0) {
        errors.push('• Domicilio: ' + addressErrors.join(', '));
      }
    }

    // 3. VALIDAR BENEFICIARIOS (solo si la sección está habilitada)
    if (this.shouldShowField('beneficialOwners')) {
      const beneficiaryErrors = this.validateBeneficiariesSection();
      if (beneficiaryErrors.length > 0) {
        errors.push('• Beneficiarios: ' + beneficiaryErrors.join(', '));
      }
    }

    console.log('Errores de validación:', errors);

    return {
      isValid: errors.length === 0,
      errors: errors
    };
  }

  // VALIDAR INFORMACIÓN GENERAL
  private validateGeneralSection(): string[] {
    const errors: string[] = [];

    // Validar nombre común (si es visible)
    if (this.shouldShowField('name')) {
      const name = this.partieForm.get('name')?.value;
      if (!name || name.toString().trim() === '') {
        errors.push('Nombre común');
      }
    }

    // Validar que tenga al menos un rol (siempre requerido)
    const roles = this.partieForm.get('roles')?.value;
    if (!roles || !Array.isArray(roles) || roles.length === 0) {
      errors.push('Debe seleccionar al menos un rol');
    }

    // Validar identifier (si es visible)
    if (this.shouldShowField('identifier')) {
      const identifier = this.partieForm.get('identifier') as FormGroup;
      if (!identifier) {
        errors.push('Información del identificador');
      } else {
        const identifierErrors = this.validateIdentifierSection(identifier);
        if (identifierErrors.length > 0) {
          errors.push(...identifierErrors);
        }
      }
    }

    return errors;
  }

  // VALIDAR IDENTIFIER
  private validateIdentifierSection(identifier: FormGroup): string[] {
    const errors: string[] = [];

    // Campos requeridos según visibilidad
    const requiredFields = [
      { field: 'legalPersonality', label: 'Personalidad jurídica', visible: this.shouldShowField('legalPersonality') },
      { field: 'schema', label: 'Esquema', visible: this.shouldShowField('schema') },
      { field: 'id', label: 'Identificador', visible: this.shouldShowField('id') },
      { field: 'legalName', label: 'Nombre legal', visible: this.shouldShowField('legalName') }
    ];

    requiredFields.forEach(({ field, label, visible }) => {
      if (visible) {
        const value = identifier.get(field)?.value;
        if (!value || value.toString().trim() === '') {
          errors.push(label);
        }
      }
    });

    // Campos requeridos solo para persona física y si son visibles
    const legalPersonality = identifier.get('legalPersonality')?.value;
    if (legalPersonality === 'fisica') {
      const personFields = [
        { field: 'givenName', label: 'Nombre de pila', visible: this.shouldShowField('givenName') },
        { field: 'patronymicName', label: 'Primer apellido', visible: this.shouldShowField('patronymicName') },
        { field: 'matronymicName', label: 'Segundo apellido', visible: this.shouldShowField('matronymicName') }
      ];

      personFields.forEach(({ field, label, visible }) => {
        if (visible) {
          const value = identifier.get(field)?.value;
          if (!value || value.toString().trim() === '') {
            errors.push(label);
          }
        }
      });
    }

    return errors;
  }

  // VALIDAR ADDRESS
  private validateAddressSection(): string[] {
    const errors: string[] = [];
    const address = this.partieForm.get('address') as FormGroup;

    // Si no existe el FormGroup de address, es requerido
    if (!address) {
      return ['Debe completar la información de domicilio'];
    }

    // Campos requeridos en address
    const requiredAddressFields = [
      { field: 'streetAddress', label: 'Dirección' },
      { field: 'locality', label: 'Localidad' },
      { field: 'region', label: 'Región' },
      { field: 'postalCode', label: 'Código postal' },
      { field: 'countryName', label: 'País' }
    ];

    requiredAddressFields.forEach(({ field, label }) => {
      const value = address.get(field)?.value;
      if (!value || value.toString().trim() === '') {
        errors.push(label);
      }
    });

    return errors;
  }

  // VALIDAR BENEFICIARIOS
  private validateBeneficiariesSection(): string[] {
    const errors: string[] = [];
    const beneficialOwners = this.partieForm.get('beneficialOwners') as FormArray;

    // Si la sección está habilitada, debe tener al menos un beneficiario
    if (!beneficialOwners || beneficialOwners.length === 0) {
      return ['Debe agregar al menos un beneficiario para los roles supplier o tenderer'];
    }

    // Validar cada beneficiario
    beneficialOwners.controls.forEach((control, index) => {
      if (control instanceof FormGroup) {
        const beneficiaryErrors = this.validateSingleBeneficiary(control, index + 1);
        if (beneficiaryErrors.length > 0) {
          errors.push(...beneficiaryErrors);
        }
      }
    });

    return errors;
  }

  // VALIDAR UN SOLO BENEFICIARIO
  private validateSingleBeneficiary(beneficiary: FormGroup, beneficiaryNumber: number): string[] {
    const errors: string[] = [];

    // Campos básicos requeridos en beneficial owners
    const basicFields = [
      { field: 'name', label: 'Nombre' },
      { field: 'nationality', label: 'Nacionalidad' },
      { field: 'email', label: 'Email' },
      { field: 'telephone', label: 'Teléfono' },
      { field: 'faxNumber', label: 'Fax' }
    ];

    const basicErrors: string[] = [];
    basicFields.forEach(({ field, label }) => {
      const value = beneficiary.get(field)?.value;
      if (!value || value.toString().trim() === '') {
        basicErrors.push(label);
      }
    });

    // Validar identifier del beneficiario
    const identifier = beneficiary.get('identifier') as FormGroup;
    if (!identifier) {
      basicErrors.push('Identificador');
    } else {
      const scheme = identifier.get('scheme')?.value;
      const id = identifier.get('id')?.value;
      
      if (!scheme || scheme.toString().trim() === '') {
        basicErrors.push('Esquema del identificador');
      }
      if (!id || id.toString().trim() === '') {
        basicErrors.push('ID del identificador');
      }
    }

    // Validar address del beneficiario
    const address = beneficiary.get('address') as FormGroup;
    if (!address) {
      basicErrors.push('Dirección');
    } else {
      const addressFields = [
        { field: 'streetAddress', label: 'Dirección' },
        { field: 'locality', label: 'Localidad' },
        { field: 'region', label: 'Región' },
        { field: 'postalCode', label: 'Código postal' },
        { field: 'countryName', label: 'País' }
      ];

      addressFields.forEach(({ field, label }) => {
        const value = address.get(field)?.value;
        if (!value || value.toString().trim() === '') {
          basicErrors.push(label);
        }
      });
    }

    if (basicErrors.length > 0) {
      errors.push(`Beneficiario ${beneficiaryNumber} incompleto: ${basicErrors.join(', ')}`);
    }

    return errors;
  }

  // Getters y métodos originales
  get partiesArray() {
    return this.partiesForm.controls['parties'] as FormArray;
  }

  confirmAndDeletePartie(index: number): void {
    Swal.fire({
      text: '¿Realmente deseas eliminar este actor?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          text: 'El registro ha sido eliminado.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        this.deletePartie(index);
      }
    });
  }

  deletePartie(index: number): void {
    this.partiesArray.removeAt(index);
    this.saveData();
  }

  getRoleTitle(code: string): string {
    return getRoleTitle(code);
  }

  // Event handlers para componentes hijos
  saveGeneral(general: FormGroup): void {
    // Actualizar el formulario padre con los datos del componente hijo
    Object.keys(general.controls).forEach(key => {
      this.partieForm.setControl(key, general.get(key) as any);
    });
    
    console.log('Datos guardados en información general:', this.partieForm.value);
  }

  saveAddress(address: FormGroup): void {
    this.partieForm = this.fb.group({
      ...this.partieForm.controls,
      address: this.fb.group({
        ...address.controls,
      }),
    });
  }

  saveContactPoint(contactPoint: FormGroup): void {
  this.partieForm = this.fb.group({
    ...this.partieForm.controls,
    contactPoint: this.fb.group({
      ...contactPoint.controls,
    }),
  });
}

  get additionalContactPointsArray() {
    return this.partieForm.controls['additionalContactPoints'] as FormArray;
  }

  addAdditionalContactPoints(contact: any): void {
    this.additionalContactPointsArray.push(contact);
  }

  deleteAdditionalContactPoints(index: number): void {
    this.additionalContactPointsArray.removeAt(index);
  }

  get beneficialOwnersArray() {
    return this.partieForm.controls['beneficialOwners'] as FormArray;
  }

  addBeneficialOwners(beneficialOwners: any): void {
    this.beneficialOwnersArray.push(beneficialOwners);
  }

  deleteBeneficialOwners(index: number): void {
    this.beneficialOwnersArray.removeAt(index);
  }

  // Métodos para identificadores adicionales
  addAdditionalIdentifier(identifier: any): void {
    const additionalIdentifiersArray = this.partieForm.controls['additionalIdentifiers'] as FormArray;
    additionalIdentifiersArray.push(identifier);
  }

  deleteAdditionalIdentifier(index: number): void {
    const additionalIdentifiersArray = this.partieForm.controls['additionalIdentifiers'] as FormArray;
    additionalIdentifiersArray.removeAt(index);
  }

  // Inicialización de formularios
  initForm(): void {
    this.partiesForm = this.fb.group({
      parties: this.fb.array([]),
    });
    this.initPartieForm();
  }

  initPartieForm(): void {
    this.partieForm = this.fb.group({
      roles: this.fb.array([]),
      name: [''],
      position: [''],
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
      additionalIdentifiers: this.fb.array([]),
      memberOf: this.fb.array([]),
      details: this.fb.group({
        listedOnRegulatedMarket: [false],
      }),
      address: this.fb.group({
        streetAddress: [''],
        locality: [''],
        region: [''],
        postalCode: [''],
        countryName: [''],
      }),
      additionalContactPoints: this.fb.array([]),
      beneficialOwners: this.fb.array([]),
    });
  }

  // Carga y guardado de datos
  loadForm(data: any): void {
    data.forEach((partie: any) => {
      this.partiesArray.push(this.fb.control(partie));
    });
  }

  loadData(): void {
    this.api.getMethod(`/parties/${this.record_id}`).subscribe((d: any) => {
      const { parties, error, message } = d;

      if (error) {
        console.log('message: ', message);
      } else {
        if (parties !== null) this.loadForm(parties);
      }
    });
  }

  saveData(): void {
    console.log('partiesForm', this.partiesForm.value);

    this.api
      .postMethod({ ...this.partiesForm.value }, `/parties/${this.record_id}`)
      .subscribe((r: any) => {
        console.log('r: ', r);
        if (r.err) {
          console.log('r: ', r);
        } else {
          this.initForm();
          this.loadData();
        }
      });
  }
}