import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tender',
  templateUrl: './tender.component.html',
  styleUrls: ['./tender.component.css']
})

export class TenderComponent implements OnInit {
  record_id = null;
  tenderForm!: FormGroup;
  
  // Propiedades para manejar errores de validación
  validationErrors: string[] = [];
  sectionsWithErrors: { [key: string]: boolean } = {};

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute
  ) {}

  get tenderersArray() {
    return this.tenderForm.controls['tenderers'] as FormArray;
  }

  addTenderer(opt: any): void {
    this.tenderersArray.push(this.fb.group({ ...opt }));
    this.clearSectionError('tenderers');
  }

  deleteTenderer(index: number): void {
    this.tenderersArray.removeAt(index);
  }

  get documentsArray() {
    return this.tenderForm.controls['documents'] as FormArray;
  }

  addDocument(opt: any): void {
    this.documentsArray.push(opt);
    this.clearSectionError('documents');
  }

  deleteDocument(index: number): void {
    this.documentsArray.removeAt(index);
  }

  get milestonesArray() {
    return this.tenderForm.controls['milestones'] as FormArray;
  }

  addMilestone(opt: any): void {
    this.milestonesArray.push(opt);
  }

  deleteMilestone(index: number): void {
    this.milestonesArray.removeAt(index);
  }

  get amendmentsArray() {
    return this.tenderForm.controls['amendments'] as FormArray;
  }

  addAmendment(opt: any): void {
    this.amendmentsArray.push(opt);
  }

  deleteAmendment(index: number): void {
    this.amendmentsArray.removeAt(index);
  }

  get clarificationMeetingsArray() {
    return this.tenderForm.controls['clarificationMeetings'] as FormArray;
  }

  addClarificationMeeting(opt: any): void {
    this.clarificationMeetingsArray.push(opt);
  }

  deleteClarificationMeeting(index: number): void {
    this.clarificationMeetingsArray.removeAt(index);
  }

  get itemsArray() {
    return this.tenderForm.controls['items'] as FormArray;
  }

  addItem(opt: any): void {
    this.itemsArray.push(opt);
    this.clearSectionError('items');
  }

  deleteItem(index: number): void {
    this.itemsArray.removeAt(index);
  }

  saveGeneralData(opt: any): void {
    this.tenderForm = this.fb.group({
      ...opt,
      ...this.tenderForm.controls,
    });
    this.clearSectionError('general');
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
    });

    // Solo los FormArrays opcionales se inicializan sin Validators.required
    this.tenderForm = this.fb.group({
      tenderers: this.fb.array([], [Validators.required]),
      documents: this.fb.array([], [Validators.required]),
      milestones: this.fb.array([]),
      amendments: this.fb.array([]),
      clarificationMeetings: this.fb.array([]),
      items: this.fb.array([], [Validators.required]),
    });
  }

  validateRequiredSections(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    this.sectionsWithErrors = {};

    // Validamos Información General
    const generalFields = ['title', 'description', 'budget', 'status'];
    const hasGeneralData = generalFields.some(field => 
      this.tenderForm.get(field) && this.tenderForm.get(field)?.value
    );
    
    if (!hasGeneralData || this.tenderForm.invalid) {
      errors.push('Información General');
      this.sectionsWithErrors['general'] = true;
    }

    // Validar Artículos (obligatorio)
    const items = this.itemsArray;
    const validItems = items.length > 0 && items.controls.every((ctrl) => ctrl.valid);
    if (!validItems) {
      errors.push('Artículos');
      this.sectionsWithErrors['items'] = true;
    }

    // Validar Licitantes (obligatorio)
    const tenderers = this.tenderersArray;
    const validTenderers = tenderers.length > 0 && tenderers.controls.every((ctrl) => ctrl.valid);
    if (!validTenderers) {
      errors.push('Licitantes');
      this.sectionsWithErrors['tenderers'] = true;
    }

    // Validar Documentos (obligatorio)
    const documents = this.documentsArray;
    const validDocuments = documents.length > 0 && documents.controls.every((ctrl) => ctrl.valid);
    if (!validDocuments) {
      errors.push('Documentos');
      this.sectionsWithErrors['documents'] = true;
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  clearSectionError(section: string): void {
    if (this.sectionsWithErrors[section]) {
      delete this.sectionsWithErrors[section];
      this.validationErrors = this.validationErrors.filter(error => {
        const sectionNames: { [key: string]: string } = {
          'general': 'Información General',
          'items': 'Artículos',
          'tenderers': 'Licitantes',
          'documents': 'Documentos'
        };
        return error !== sectionNames[section];
      });
    }
  }

  submit(): void {
    // Limpiar errores previos
    this.validationErrors = [];
    this.sectionsWithErrors = {};

    // Validar solo las secciones requeridas
    const validation = this.validateRequiredSections();

    if (!validation.isValid) {
      this.validationErrors = validation.errors;

      // Crear lista HTML para SweetAlert2
      const errorsList = validation.errors.map(error => `• ${error}`).join('<br>');
      
      const htmlContent = `
        <div style="text-align: left;">
          <strong style="color: #dc3545;">Secciones pendientes:</strong><br><br>
          <div style="color: #dc3545;">${errorsList}</div>
        </div>
      `;

      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        html: htmlContent,
        footer: 'Revisa cada pestaña y asegúrate de completar todos los campos obligatorios.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#ffc107',
      });

      // Marcar como touched solo las secciones con errores
      if (this.sectionsWithErrors['general']) {
        this.tenderForm.markAllAsTouched();
      }
      if (this.sectionsWithErrors['items']) {
        this.itemsArray.controls.forEach((ctrl) => ctrl.markAllAsTouched());
      }
      if (this.sectionsWithErrors['tenderers']) {
        this.tenderersArray.controls.forEach((ctrl) => ctrl.markAllAsTouched());
      }
      if (this.sectionsWithErrors['documents']) {
        this.documentsArray.controls.forEach((ctrl) => ctrl.markAllAsTouched());
      }

      return;
    }

    // Todo válido, proceder con el guardado
    console.log('Formulario válido, guardando...');
    
    this.api
      .postMethod({ ...this.tenderForm.value }, `/tender/${this.record_id}`)
      .subscribe((r: any) => {
        console.log('Respuesta del backend: ', r);
        
        // Mostrar mensaje de éxito
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'La contratación pública se ha guardado correctamente',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#28a745',
        });
        
        // Limpiar errores
        this.validationErrors = [];
        this.sectionsWithErrors = {};
      }, (error) => {
        console.error('Error al guardar:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al guardar la información',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#dc3545',
        });
      });
  }
}