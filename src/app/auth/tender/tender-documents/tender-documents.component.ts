import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

@Component({
  selector: 'app-tender-documents',
  templateUrl: './tender-documents.component.html',
  styleUrls: ['./tender-documents.component.css'],
})
export class TenderDocumentsComponent implements OnInit {
  @Input() documentsArray: Array<any> = [];
  @Output() addDocument = new EventEmitter<any>();
  @Output() deleteDocument = new EventEmitter<any>();

  record_id = null;

  documents = getDocumentType('tender');
  formatDocument = FormatDocument;
  language = Language;

  documentForm!: FormGroup;
  mostrarSpinner = false;
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
        if (tender !== null) this.loadForm(tender.documents);
      }
    });
  }

  ngOnInit(): void {
    this.initForm();
    this.loadData();
  }

  initForm(): void {
    this.documentForm = this.fb.group(
      {
        documentType: ['', [Validators.required]],
        title: ['', [Validators.required]],
        description: [''],
        url: ['', [Validators.required]],
        datePublished: ['', [Validators.required]],
        dateModified: ['', [Validators.required]],
        format: ['', [Validators.required]],
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
  get datePublished() {
    return this.documentForm.get('datePublished') as FormControl;
  }
  get dateModified() {
    return this.documentForm.get('dateModified') as FormControl;
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
        // Combina el error existente con el nuevo
        const currentErrors = dateModifiedControl?.errors || {}; // Obtén los errores actuales
        dateModifiedControl?.setErrors({
          ...currentErrors,
          dateModifiedInvalid: true,
        });
        return { dateModifiedInvalid: true };
      }

      // Si pasa la validación personalizada, elimina SOLO el error `dateModifiedInvalid`
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

  addNewDocument(): void {
    this.mostrarSpinner = true;
    this.addDocument.emit(this.documentForm);
    this.initForm();
    setTimeout(() => {
      this.mostrarSpinner = false;
      console.log('agregando al arreglo');
    }, 1000);
  }
}
