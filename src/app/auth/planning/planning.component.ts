import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { PlanningGeneralComponent } from './planning-general/planning-general.component';
import { PlanningDocumentsComponent } from './planning-documents/planning-documents.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css'],
})
export class PlanningComponent implements OnInit {
  @ViewChild(PlanningGeneralComponent) planningGeneralComponent!: PlanningGeneralComponent;
  @ViewChild(PlanningDocumentsComponent) planningDocumentsComponent!: PlanningDocumentsComponent;
  
  record_id = null;
  planningForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute
  ) {}

  get budgetForm() {
    return this.planningForm.controls['budget'] as FormGroup;
  }

  get budgetArray() {
    return this.planningForm.controls['budget'] as FormArray;
  }
  
  addBudget(opt: any): void {
    this.budgetArray.push(opt);
  }
  
  deleteBudget(index: number): void {
    this.budgetArray.removeAt(index);
  }

  get documentsArray() {
    return this.planningForm.controls['documents'] as FormArray;
  }
  
  addDocument(opt: any): void {
    this.documentsArray.push(opt);
  }
  
  deleteDocument(index: number): void {
    this.documentsArray.removeAt(index);
  }

  get requestForQuotesArray() {
    return this.planningForm.controls['requestForQuotes'] as FormArray;
  }
  
  addRequestForQuotes(opt: any): void {
    this.requestForQuotesArray.push(opt);
  }
  
  deleteRequestForQuotes(index: number): void {
    this.requestForQuotesArray.removeAt(index);
  }

  get itemsArray() {
    return this.planningForm.controls['items'] as FormArray;
  }
  
  addItems(opt: any): void {
    this.itemsArray.push(opt);
  }
  
  deleteItems(index: number): void {
    this.itemsArray.removeAt(index);
  }

  get milestonesArray() {
    return this.planningForm.controls['milestones'] as FormArray;
  }
  
  addMilestones(opt: any): void {
    this.milestonesArray.push(opt);
  }
  
  deleteMilestones(index: number): void {
    this.milestonesArray.removeAt(index);
  }

  saveGeneralData(opt: any): void {
    // SOLUCION CORREGIDA: Evitar destruir el FormGroup
    Object.keys(opt).forEach(key => {
      const control = opt[key];
      const existingControl = this.planningForm.get(key);
      
      if (existingControl) {
        // Si el control ya existe, actualizar su valor sin perder validaciones
        existingControl.setValue(control.value);
        // Mantener el estado de validación
        if (control.invalid) {
          existingControl.setErrors(control.errors);
        }
      } else {
        // Solo agregar nuevos controles si no existen
        this.planningForm.addControl(key, control);
      }
    });
    
    console.log('✅ Datos generales guardados sin destruir validaciones');
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
      console.log('planning id: ', this.record_id);
    });

    this.initForm();
  }

  initForm(): void {
    this.planningForm = this.fb.group({
      budget: this.fb.group({
        description: ['', [Validators.required]],
        value: this.fb.group({
          amount: [, [Validators.required, Validators.min(1)]],
          currency: ['MXN', [Validators.required]],
        }),
        project: ['', [Validators.required]],
        projectID: ['', [Validators.required]],
        uri: ['', [Validators.required]],
        budgetBreakdown: this.fb.array([]),
      }),
      documents: this.fb.array([]),
      requestForQuotes: this.fb.array([]),
      milestones: this.fb.array([]),
    });
  }

  /**
   * Valida todas las secciones y retorna el estado de validación
   */
  private validateAllSections(): { isValid: boolean; missingSections: string[] } {
    const missingSections: string[] = [];
    
    // Validar Información General
    if (!this.isGeneralInfoValid()) {
      missingSections.push('Información General');
    }
    
    // Validar Presupuesto
    const budget = this.planningForm.get('budget') as FormGroup;
    if (!budget.valid) {
      missingSections.push('Presupuesto');
    }
    
    // Validar Documentos - verificar documentos requeridos específicos
    if (!this.areRequiredDocumentsValid()) {
      missingSections.push('Documentos');
    }
    
    // Validar Solicitudes de Cotización (obligatorio con items)
    if (!this.areRequestForQuotesValid()) {
      missingSections.push('Solicitudes de Cotización');
    }
    
    // Hitos/Milestones NO es obligatorio según tu especificación
    
    return {
      isValid: missingSections.length === 0,
      missingSections
    };
  }

  /**
   * Valida la información general usando el método del componente hijo
   */
  private isGeneralInfoValid(): boolean {
    if (!this.planningGeneralComponent) {
      console.warn('PlanningGeneralComponent no está disponible');
      return false;
    }
    
    return this.planningGeneralComponent.enableSaveFormButton();
  }

  /**
   * Valida que los documentos requeridos estén presentes y sean válidos
   */
  private areRequiredDocumentsValid(): boolean {
    if (!this.planningDocumentsComponent) {
      console.warn('PlanningDocumentsComponent no está disponible');
      return false;
    }

    const requiredDocumentCodes = ['areaTechnicalAnnex', 'marketStudies', 'budgetAuthorization'];
    const documentsArray = this.documentsArray.value;
    
    // Verificar que todos los documentos requeridos estén presentes
    const hasAllRequiredDocs = requiredDocumentCodes.every(requiredCode => 
      documentsArray.some((doc: any) => doc.documentType === requiredCode)
    );
    
    // Verificar que todos los documentos en el array sean válidos
    const allDocsValid = this.documentsArray.controls.every((ctrl: any) => ctrl.valid);
    
    return hasAllRequiredDocs && allDocsValid;
  }

  /**
   * Valida las solicitudes de cotización de manera integral
   */
  private areRequestForQuotesValid(): boolean {
    const requestForQuotes = this.requestForQuotesArray;
    
    // Debe haber al menos una solicitud de cotización
    if (requestForQuotes.length === 0) {
      console.log('❌ No hay solicitudes de cotización');
      return false;
    }
    
    // Cada solicitud debe ser válida
    const allRequestsValid = requestForQuotes.controls.every((ctrl: any) => {
      const isValid = ctrl.valid;
      if (!isValid) {
        console.log('❌ Solicitud de cotización inválida:', ctrl.errors);
      }
      return isValid;
    });
    
    if (!allRequestsValid) {
      return false;
    }
    
    // Verificar que cada solicitud tenga al menos un item (artículo)
    const allHaveItems = requestForQuotes.value.every((request: any, index: number) => {
      const hasItems = request.items && request.items.length > 0;
      if (!hasItems) {
        console.log(`❌ La solicitud de cotización ${index + 1} no tiene artículos`);
      }
      return hasItems;
    });
    
    return allHaveItems;
  }

  /**
   * Marca como touched solo las secciones que están inválidas
   */
  private markInvalidSectionsAsTouched(sectionsStatus: { missingSections: string[] }): void {
    // Marcar como touched solo las secciones inválidas
    if (sectionsStatus.missingSections.includes('Información General')) {
      if (this.planningGeneralComponent?.generalForm) {
        this.planningGeneralComponent.generalForm.markAllAsTouched();
      }
    }

    if (sectionsStatus.missingSections.includes('Presupuesto')) {
      const budget = this.planningForm.get('budget') as FormGroup;
      budget.markAllAsTouched();
    }

    if (sectionsStatus.missingSections.includes('Documentos')) {
      this.documentsArray.controls.forEach((ctrl: any) => ctrl.markAllAsTouched());
    }

    if (sectionsStatus.missingSections.includes('Solicitudes de Cotización')) {
      const requestForQuotes = this.requestForQuotesArray;
      requestForQuotes.controls.forEach((ctrl: any) => ctrl.markAllAsTouched());
    }
  }

  /**
   * Método principal de validación y envío
   */
  submit(): void {
    console.log('=== INICIANDO VALIDACIÓN COMPLETA ===');
    console.log('Estado del formulario principal:', this.planningForm.valid);
    console.log('Estructura del formulario:');
    console.log('- Documents array length:', this.documentsArray.length);
    console.log('- Request for quotes array length:', this.requestForQuotesArray.length);
    console.log('- Budget valid:', this.budgetForm.valid);
    
    // Verificar que los ViewChild estén disponibles
    if (!this.planningGeneralComponent) {
      console.warn('⚠️ PlanningGeneralComponent no está disponible');
    }
    if (!this.planningDocumentsComponent) {
      console.warn('⚠️ PlanningDocumentsComponent no está disponible');
    }
    
    const sectionsStatus = this.validateAllSections();
    console.log('📋 Estado de validación detallado:', sectionsStatus);
    
    if (!sectionsStatus.isValid) {
      const missingSectionsText = sectionsStatus.missingSections.join(', ');
      
      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        text: `Debes completar las siguientes secciones: ${missingSectionsText}`,
        footer: 'Revisa cada pestaña y asegúrate de completar todos los campos obligatorios.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#ffc107',
      });

      // Marcar como touched solo las secciones inválidas
      this.markInvalidSectionsAsTouched(sectionsStatus);
      
      console.log('❌ Validación fallida. Secciones faltantes:', missingSectionsText);
      return;
    }

    // Todo válido, proceder con el guardado
    console.log('✅ TODAS LAS VALIDACIONES PASARON');
    console.log('Datos a enviar:', this.planningForm.value);
    
    this.api
      .postMethod({ ...this.planningForm.value }, `/planning/${this.record_id}`)
      .subscribe(
        (r: any) => {
          console.log('✅ Respuesta del backend exitosa:', r);
          
          Swal.fire({
            icon: 'success',
            title: 'Guardado exitoso',
            text: 'La planeación se ha guardado correctamente.',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#28a745',
          });
        }, 
        (error: any) => {
          console.error('❌ Error al guardar:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error al guardar',
            text: 'Ocurrió un error al intentar guardar la planeación. Por favor, inténtalo de nuevo.',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#dc3545',
          });
        }
      );
  }
}