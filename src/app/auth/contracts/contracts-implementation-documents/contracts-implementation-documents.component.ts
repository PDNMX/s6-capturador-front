import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { FormatDocument, getDocumentType, Language } from 'src/utils';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contracts-implementation-documents',
  templateUrl: './contracts-implementation-documents.component.html',
  styleUrls: ['./contracts-implementation-documents.component.css'],
})
export class ContractsImplementationDocumentsComponent implements OnInit {
  @Input() documentsArray: Array<any> = [];
  @Output() addDocument = new EventEmitter<any>();
  @Output() deleteDocument = new EventEmitter<any>();

  formatDocument = FormatDocument;
  language = Language;
  documents = getDocumentType('award');

  documentsForm!: FormGroup;
  mostrarSpinner = false;
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
        desc = d?.name;
      }
    });
    return desc;
  }

  getLanguage(code: string): string {
    let desc = '';
    this.language.forEach((d) => {
      if (d.code === code) {
        desc = d?.name;
      }
    });
    return desc;
  }

  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void {
    this.documentsForm = this.fb.group({
      documentType: ['', Validators.required],
      title: ['', Validators.required],
      description: [''],
      url: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^https?:\/\/(?:[a-zA-Z0-9\-._~%!$&'()*+,;=:@]+|%[0-9A-Fa-f]{2})*(?:\/(?:[a-zA-Z0-9\-._~%!$&'()*+,;=:@]+|%[0-9A-Fa-f]{2})*)*(?:\?(?:[a-zA-Z0-9\-._~%!$&'()*+,;=:@/?]+|%[0-9A-Fa-f]{2})*)?(?:#(?:[a-zA-Z0-9\-._~%!$&'()*+,;=:@/?]+|%[0-9A-Fa-f]{2})*)?$/
          ),
        ],
      ],
      datePublished: ['', Validators.required],
      dateModified: ['', Validators.required],
      format: ['', Validators.required],
      language: ['', Validators.required],
    }, { validators: this.dateComparisonValidator() });
  }

  get documentType() {
    return this.documentsForm.get('documentType') as FormControl;
  }
  get title() {
    return this.documentsForm.get('title') as FormControl;
  }
  get url() {
    return this.documentsForm.get('url') as FormControl;
  }
  get datePublished() {
    return this.documentsForm.get('datePublished') as FormControl;
  }
  get dateModified() {
    return this.documentsForm.get('dateModified') as FormControl;
  }
  get format() {
    return this.documentsForm.get('format') as FormControl;
  }
  get languageList() {
    return this.documentsForm.get('language') as FormControl;
  }

  private dateComparisonValidator(): (
    group: FormControl
  ) => ValidationErrors | null {
    return (group: FormControl): ValidationErrors | null => {
      const datePublished = group.get('datePublished')?.value;
      const dateModifiedControl = group.get('dateModified');
      const dateModified = dateModifiedControl?.value;

      if (
        datePublished &&
        dateModified &&
        new Date(dateModified) < new Date(datePublished)
      ) {
        const currentErrors = dateModifiedControl?.errors || {};
        dateModifiedControl?.setErrors({
          ...currentErrors,
          dateModifiedInvalid: true,
        });
        return { dateModifiedInvalid: true };
      }

      if (dateModifiedControl?.errors) {
        const { dateModifiedInvalid, ...otherErrors } = dateModifiedControl.errors;
        dateModifiedControl.setErrors(
          Object.keys(otherErrors).length > 0 ? otherErrors : null
        );
      }

      return null;
    };
  }

  enableAddDocumentButton(): boolean {
    return this.documentsForm.valid && this.documentsForm.dirty;
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
}
