import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormatDocument, getDocumentType, Language } from 'src/utils';

@Component({
  selector: 'app-tender-documents',
  templateUrl: './tender-documents.component.html',
  styleUrls: ['./tender-documents.component.css'],
})
export class TenderDocumentsComponent implements OnInit {
  documents = getDocumentType('tender');
  formatDocument = FormatDocument;
  languaje = Language;
  documentsArray: Array<any> = [];
  documentForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

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

  addDocument(): void {
    console.log(this.documentForm.value);
    this.documentsArray.push(this.documentForm.value);
  }

  deleteDocument(index: number): void {
    this.documentsArray = this.documentsArray.filter((d, i) => i !== index);
  }
}
