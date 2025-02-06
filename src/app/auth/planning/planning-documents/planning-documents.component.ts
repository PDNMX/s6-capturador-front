import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

@Component({
  selector: 'app-planning-documents',
  templateUrl: './planning-documents.component.html',
  styleUrls: ['./planning-documents.component.css'],
})
export class PlanningDocumentsComponent implements OnInit {
  @Input() documentsArray: Array<any> = [];
  @Output() addDocument = new EventEmitter<any>();
  @Output() deleteDocument = new EventEmitter<any>();

  record_id = '';

  documents = getDocumentType('planning');
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
    this.initForm();
    setTimeout(() => {
      this.mostrarSpinner = false;
      console.log('agregando al arreglo');
    }, 1000);
  }
}
