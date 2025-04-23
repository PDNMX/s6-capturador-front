import { Component, EventEmitter, Input, OnInit, OnChanges, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FormatDocument, getDocumentType, Language } from 'src/utils';
import Swal from 'sweetalert2';
import { IDocumentType } from 'src/utils/documentType';
declare var bootstrap: any;

@Component({
  selector: 'app-planning-documents',
  templateUrl: './planning-documents.component.html',
  styleUrls: ['./planning-documents.component.css'],
})
export class PlanningDocumentsComponent implements OnInit, OnChanges {
  @Input() documentsArray: Array<any> = [];
  @Output() addDocument = new EventEmitter<any>();
  @Output() deleteDocument = new EventEmitter<any>();

  record_id = '';

  documents = getDocumentType('planning');
  
  // Lista filtrada para el select (sin los requeridos)
  filteredDocuments: Array<IDocumentType> = [];
  
  // Documentos requeridos (mostrados como botones)
  requiredDocuments: Array<IDocumentType> = [];
  requiredDocumentCodes = ['areaTechnicalAnnex', 'marketStudies', 'budgetAuthorization'];
  
  formatDocument = FormatDocument;
  language = Language;

  documentForm!: FormGroup;
  mostrarSpinner = false;
  
  // Variables para controlar el modal
  documentModal: any;
  modalTitle = 'Agregar documento';
  showDocumentTypeSelect = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  getDocumentTypeDesc(code: string): string {
    let desc = '';
    this.documents.forEach((d) => {
      if (d.code === code) desc = d.description;
    });

    return desc;
  }

  getDocumentTypeTitle(code: string): string {
    let desc = '';
    this.documents.forEach((d) => {
      if (d.code === code) desc = d.title;
    });

    return desc;
  }

  getFormatDocument(code: string): string {
    let desc = '';
    this.formatDocument.forEach((d) => {
      if (d.template === code) desc = d.name;
    });

    return desc;
  }

  getLanguage(code: string): string {
    let desc = '';
    this.language.forEach((d) => {
      if (d.code === code) desc = d.name;
    });

    return desc;
  }


  // Verifica si un tipo de documento ya existe en el array de documentos
  documentExists(docTypeCode: string): boolean {
    return this.documentsArray.some(doc => doc.documentType === docTypeCode);
  }

  // Devuelve la clase CSS para el botón según si el documento ya existe
  getButtonClass(docTypeCode: string): string {
    return this.documentExists(docTypeCode) ? 'btn-success' : 'btn-primary';
  }

  // Devuelve el título del botón según si el documento ya existe
  getButtonTitle(requiredDoc: IDocumentType): string {
    return this.documentExists(requiredDoc.code) 
      ? `${requiredDoc.title} (Ya agregado)` 
      : requiredDoc.description;
  }

  // Agregamos método para detectar cambios en documentsArray
  ngOnChanges(): void {
    console.log('documentsArray cambió:', this.documentsArray);
    // Podemos usar esto para actualizar dinámicamente el estado de los botones
  }

  // Filtra los documentos para el select (excluyendo los requeridos)
  filterDocuments() {
    this.filteredDocuments = this.documents.filter(
      doc => !this.requiredDocumentCodes.includes(doc.code)
    );
  }

  // Inicializa la lista de documentos requeridos
  initRequiredDocuments() {
    this.requiredDocuments = this.documents.filter(
      doc => this.requiredDocumentCodes.includes(doc.code)
    );
  }

  loadForm(data: any): void {
    data.forEach((doc: any) => {
      this.addDocument.emit(this.fb.group({ ...doc }));
    });
  }

  loadData(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
    });

    this.api.getMethod(`/planning/${this.record_id}`).subscribe((d: any) => {
      const { planning, error, message } = d;

      if (error) {
        console.log('message: ', message);
      } else {
        // load forms
        if (planning !== null) this.loadForm(planning.documents);
      }
    });
  }

  ngOnInit(): void {
    this.initForm();
    this.loadData();
    this.initRequiredDocuments();
    this.filterDocuments();
    
    // Inicializar el modal después de un pequeño retraso para asegurar que el DOM esté listo
    setTimeout(() => {
      const modalEl = document.getElementById('documentModal');
      if (modalEl) {
        this.documentModal = new bootstrap.Modal(modalEl);
      }
    }, 100);
  }

  // Abrir modal con un tipo de documento específico
  openModalWithDocType(docTypeCode: string) {
    const docType = this.documents.find(doc => doc.code === docTypeCode);
    if (docType) {
      this.modalTitle = `Agregar documento: ${docType.title}`;
      this.showDocumentTypeSelect = false;
      this.documentForm.patchValue({
        documentType: docTypeCode
      });
      
      // Validamos si el modal está inicializado
      if (!this.documentModal) {
        const modalEl = document.getElementById('documentModal');
        if (modalEl) {
          this.documentModal = new bootstrap.Modal(modalEl);
        }
      }
      
      if (this.documentModal) {
        this.documentModal.show();
      } else {
        console.error('El modal no pudo ser inicializado');
      }
    }
  }

  // Abrir modal para "Agregar otro documento"
  openModalForOtherDocument() {
    this.modalTitle = 'Agregar otro documento';
    this.showDocumentTypeSelect = true;
    this.documentForm.patchValue({
      documentType: ''
    });
    
    // Verificar si el modal está inicializado
    if (!this.documentModal) {
      const modalEl = document.getElementById('documentModal');
      if (modalEl) {
        this.documentModal = new bootstrap.Modal(modalEl);
      }
    }
    
    if (this.documentModal) {
      this.documentModal.show();
    } else {
      console.error('El modal no pudo ser inicializado');
    }
  }

  get documentType(): FormControl {
    return this.documentForm.get('documentType') as FormControl;
  }

  get title(): FormControl {
    return this.documentForm.get('title') as FormControl;
  }

  get description(): FormControl {
    return this.documentForm.get('description') as FormControl;
  }

  get url(): FormControl {
    return this.documentForm.get('url') as FormControl;
  }

  get datePublished(): FormControl {
    return this.documentForm.get('datePublished') as FormControl;
  }

  get dateModified(): FormControl {
    return this.documentForm.get('dateModified') as FormControl;
  }

  get format(): FormControl {
    return this.documentForm.get('format') as FormControl;
  }

  get doc_language(): FormControl {
    return this.documentForm.get('language') as FormControl;
  }

  private dateComparisonValidator(): (
    group: AbstractControl
  ) => ValidationErrors | null {
    return (group: AbstractControl): ValidationErrors | null => {
      const datePublished = group.get('datePublished')?.value;
      const dateModifiedControl = group.get('dateModified'); // Obtén el control
      const dateModified = dateModifiedControl?.value;

      if (
        datePublished &&
        dateModified &&
        new Date(dateModified) < new Date(datePublished)
      ) {
        const currentErrors = dateModifiedControl?.errors || {}; // Obtén los errores actuales
        dateModifiedControl?.setErrors({
          ...currentErrors,
          dateModifiedInvalid: true,
        });
        return { dateModifiedInvalid: true };
      }

      if (dateModifiedControl?.errors) {
        const { dateModifiedInvalid, ...otherErrors } =
          dateModifiedControl.errors;
        dateModifiedControl.setErrors(
          Object.keys(otherErrors).length > 0 ? otherErrors : null
        );
      }

      return null;
    };
  }

  initForm(): void {
    this.documentForm = this.fb.group(
      {
        documentType: ['', [Validators.required]],
        title: ['', [Validators.required]],
        description: ['', [Validators.required]],
        url: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^https?:\/\/(?:[a-zA-Z0-9\-._~%!$&'()*+,;=:@]+|%[0-9A-Fa-f]{2})*(?:\/(?:[a-zA-Z0-9\-._~%!$&'()*+,;=:@]+|%[0-9A-Fa-f]{2})*)*(?:\?(?:[a-zA-Z0-9\-._~%!$&'()*+,;=:@/?]+|%[0-9A-Fa-f]{2})*)?(?:#(?:[a-zA-Z0-9\-._~%!$&'()*+,;=:@/?]+|%[0-9A-Fa-f]{2})*)?$/
            ),
          ],
        ],
        datePublished: ['', [Validators.required]],
        dateModified: ['', [Validators.required]],
        format: ['', [Validators.required]],
        language: ['', [Validators.required]],
      },
      { validators: this.dateComparisonValidator() }
    );
  }

  addNewDocument(): void {
    this.mostrarSpinner = true;
    this.addDocument.emit(this.documentForm);
    setTimeout(() => {
      this.mostrarSpinner = false;
      console.log('agregando al arreglo');
      this.documentModal.hide();
      this.initForm();
      
      // Detectar cambios para actualizar la UI
      if (this.documentsArray && this.documentsArray.length > 0) {
        console.log('Documentos actualizados:', this.documentsArray);
      }
    }, 1000);
  }
  
  confirmAndDeleteDocument(index: number): void {
    Swal.fire({
      text: '¿Deseas eliminar el documento?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          text: 'El registro ha sido eliminado.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        this.deleteDocument.emit(index);
      }
    });
  }
}