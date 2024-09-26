import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  documents = getDocumentType('tender');
  formatDocument = FormatDocument;
  languaje = Language;

  documentForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

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

  getLanguaje(code: string): string {
    let desc = '';
    this.languaje.forEach((d) => {
      if (d.code === code) desc = d.name;
    });

    return desc;
  }

  ngOnInit(): void {
    this.initForm();
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
      languaje: ['', [Validators.required]],
    });
  }

  addNewDocument(): void {
    this.addDocument.emit(this.documentForm);
    this.initForm();
  }
}
