import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { FormatDocument, getDocumentType, Language } from 'src/utils';

@Component({
  selector: 'app-awards-documents',
  templateUrl: './awards-documents.component.html',
  styleUrls: ['./awards-documents.component.css'],
})
export class AwardsDocumentsComponent implements OnInit {
  @Input() documentsArray: Array<any> = [];
  @Output() addDocument = new EventEmitter<any>();
  @Output() deleteDocument = new EventEmitter<any>();

  formatDocument = FormatDocument;
  languaje = Language;
  documents = getDocumentType('award');

  documentsForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

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

  getLanguaje(code: string): string {
    let desc = '';
    this.languaje.forEach((d) => {
      if (d.code === code) {
        desc = d.name;
      }
    });
    return desc;
  }

  loadForm(data: any): void {
    data.forEach((doc: any) => {
      this.addDocument.emit(this.fb.group({ ...doc }));
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.documentsForm = this.fb.group({
      documentType: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      url: ['', Validators.required],
      datePublished: ['', Validators.required],
      dateModified: ['', Validators.required],
      format: ['', Validators.required],
      language: ['', Validators.required],
    });
  }
  addNewDocument(): void {
    this.addDocument.emit(this.documentsForm);
    console.log(this.documentsForm.value);
    this.initForm();
  }
}
