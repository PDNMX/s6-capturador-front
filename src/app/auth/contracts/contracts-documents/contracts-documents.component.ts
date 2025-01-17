import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FormatDocument, getDocumentType, Language } from 'src/utils';

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
        // if (contract !== null) this.loadForm(tender.documents);
      }
    });
  }

  ngOnInit(): void {
    this.initForm();
    this.loadData();
  }

  initForm(): void {
    this.documentForm = this.fb.group({
      documentType: ['', [Validators.required]],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      url: ['', [Validators.required]],
      datePublished: ['', [Validators.required]],
      dateModified: ['', [Validators.required]],
      format: ['', [Validators.required]],
      language: ['', [Validators.required]],
    });
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
