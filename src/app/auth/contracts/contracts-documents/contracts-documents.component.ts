import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
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
  selector: 'app-contracts-documents',
  templateUrl: './contracts-documents.component.html',
  styleUrls: ['./contracts-documents.component.css'],
})
export class ContractsDocumentsComponent {
  @Input() documentsArray: Array<any> = [];
  @Output() addDocument = new EventEmitter<any>();
  @Output() deleteDocument = new EventEmitter<any>();

  record_id = null;

  documents = getDocumentType('contract');
  formatDocument = FormatDocument;
  language = Language;

  filteredDocuments: Array<IDocumentType> = [];

  requiredDocuments: Array<IDocumentType> = [];
  requiredDocumentCodes = [
    'contractAnnexe',
    'amendmentAgreements',
    'contractSigned',
    'contractGuarantees'
  ];

  documentForm!: FormGroup;
  mostrarSpinner = false;

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
    return this.documentsArray.some((doc) => doc.documentType === docTypeCode);
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
      (doc) => !this.requiredDocumentCodes.includes(doc.code)
    );
  }

  // Inicializa la lista de documentos requeridos
  initRequiredDocuments() {
    this.requiredDocuments = this.documents.filter((doc) =>
      this.requiredDocumentCodes.includes(doc.code)
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

    this.api.getMethod(`/tender/${this.record_id}`).subscribe((d: any) => {
      const { tender, error, message } = d;

      if (error) {
        console.log('message: ', message);
      } else {
        // load forms
        // if (contract !== null) this.loadForm(tender.documents);
      }
    });
  }

  ngOnInit(): void {
    this.initForm();
    this.loadData();
    this.initRequiredDocuments();
    this.filterDocuments();

    setTimeout(() => {
      const modalEl = document.getElementById('documentModal');
      if (modalEl) {
        this.documentModal = new bootstrap.Modal(modalEl);
      }
    },100); 
  }

  // abrir modal con un tipo de documento específico
  openModalWithDocType(docTypeCode: string) {
    const docType = this.documents.find((doc) => doc.code === docTypeCode);
    if (docType) {
      this.modalTitle = `Agregar documento: ${docType.title}`;
      this.showDocumentTypeSelect = false;
      this.documentForm.patchValue({
        documentType: docTypeCode,
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
      documentType: '',
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
        format: [null],
        language: ['', [Validators.required]],
      },
      { validators: this.dateComparisonValidator() }
    );
  }

  get documentType() {
    return this.documentForm.get('documentType') as FormControl;
  }
  get title() {
    return this.documentForm.get('title') as FormControl;
  }
  get url() {
    return this.documentForm.get('url') as FormControl;
  }
  get description() {
    return this.documentForm.get('description') as FormControl;
  }
  get datePublished() {
    return this.documentForm.get('datePublished') as FormControl;
  }
  get dateModified() {
    return this.documentForm.get('dateModified') as FormControl;
  }
  get format() {
    return this.documentForm.get('format') as FormControl;
  }
  get languageList() {
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

  enableAddDocumentButton(): boolean {
    return this.documentForm.valid && this.documentForm.dirty;
  }

  addNewDocument(): void {
    this.mostrarSpinner = true;
    this.addDocument.emit(this.documentForm);
    this.initForm();
    setTimeout(() => {
      this.mostrarSpinner = false;
      console.log('agregando al arreglo');
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
