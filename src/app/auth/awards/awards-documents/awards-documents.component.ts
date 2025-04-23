import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { FormatDocument, getDocumentType, Language } from 'src/utils';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { IDocumentType } from 'src/utils/documentType';
declare var bootstrap: any;

@Component({
  selector: 'app-awards-documents',
  templateUrl: './awards-documents.component.html',
  styleUrls: ['./awards-documents.component.css'],
})
export class AwardsDocumentsComponent implements OnInit {
  @Input() documentsArray: Array<any> = [];
  @Output() addDocument = new EventEmitter<any>();
  @Output() deleteDocument = new EventEmitter<any>();
  record_id = '';

  formatDocument = FormatDocument;
  data_language = Language;
  documents = getDocumentType('award');

  filteredDocuments: Array<IDocumentType> = [];

  requiredDocuments: Array<IDocumentType> = [];
  requiredDocumentCodes = ['awardDecisionCertificate', 'awardNotification'];

  documentsForm!: FormGroup;
  mostrarSpinner = false;

  documentModal: any;
  modalTitle = 'Agregar documento';
  showDocumentTypeSelect = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute
  ) {}

  getDocumentTypeTitle(code: string): string {
    let desc = '';
    this.documents.forEach((d) => {
      if (d.code === code) {
        desc = d.title;
      }
    });
    return desc;
  }

  getDocumentTypeDesc(code: string): string {
    let desc = '';
    this.documents.forEach((d) => {
      if (d.code === code) {
        desc = d.description;
      }
    });
    return desc;
  }

  getFormatDocument(code: string): string {
    let desc = '';
    this.formatDocument.forEach((d) => {
      if (d.template === code) {
        desc = d.name;
      }
    });
    return desc;
  }

  getLanguage(code: string): string {
    let desc = '';
    this.data_language.forEach((d) => {
      if (d.code === code) {
        desc = d.name;
      }
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

  /* loadForm(data: any): void {
    data.forEach((doc: any) => {
      this.addDocument.emit(this.fb.group({ ...doc }));
    });
  }

  loadData(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
    });

    this.api.getMethod(`/awards/${this.record_id}`).subscribe((d: any) => {
      const { awards, error, message } = d;
      if (error) {
        console.log('message', message);
      } else {
        if (awards !== null) this.loadForm(awards.documents);
      }
    });
  } */

  ngOnInit(): void {
    this.initForm();
    //this.loadData();
    this.initRequiredDocuments();
    this.filterDocuments();

    // Inicializar el modal después de un pequeño retraso para asegurar que el DOM esté listo
    setTimeout(() => {
      const modalEl = document.getElementById('documentModal');
      if (modalEl) {
        this.documentModal = new bootstrap.Modal(modalEl);
      }
    },100);
  }

  get documentType(): FormControl {
    return this.documentsForm.get('documentType') as FormControl;
  }

  get title(): FormControl {
    return this.documentsForm.get('title') as FormControl;
  }

  get description(): FormControl {
    return this.documentsForm.get('description') as FormControl;
  }

  get url(): FormControl {
    return this.documentsForm.get('url') as FormControl;
  }

  get datePublished(): FormControl {
    return this.documentsForm.get('datePublished') as FormControl;
  }

  get dateModified(): FormControl {
    return this.documentsForm.get('dateModified') as FormControl;
  }

  get format(): FormControl {
    return this.documentsForm.get('format') as FormControl;
  }

  get language(): FormControl {
    return this.documentsForm.get('language') as FormControl;
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

  //Abrir modal con un tipo de documento específico
  openModalWithDocType(docTypeCode: string) {
    const docType = this.documents.find((doc) => doc.code === docTypeCode);
    if (docType) {
      this.modalTitle = `Agregar documento: ${docType.title}`;
      this.showDocumentTypeSelect = false;
      this.documentsForm.patchValue({
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
    this.documentsForm.patchValue({
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
    this.documentsForm = this.fb.group(
      {
        documentType: ['', Validators.required],
        title: ['', Validators.required],
        description: ['', Validators.required],
        url: ['', Validators.required],
        datePublished: ['', Validators.required],
        dateModified: ['', Validators.required],
        format: ['', Validators.required],
        language: ['', Validators.required],
      },
      { validators: this.dateComparisonValidator() }
    );
  }
  addNewDocument(): void {
    this.mostrarSpinner = true;
    this.addDocument.emit(this.documentsForm);
    //console.log(this.documentsForm.value);
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
