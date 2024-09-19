import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormatDocument, getDocumentType } from 'src/utils';

@Component({
  selector: 'app-tender-documents',
  templateUrl: './tender-documents.component.html',
  styleUrls: ['./tender-documents.component.css'],
})
export class TenderDocumentsComponent implements OnInit {
  documents = getDocumentType('tender');
  formatDocument = FormatDocument;
  documentsArray: Array<any> = [];
  documentForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.documentForm = this.fb.group({
      documentType: ['', [Validators.required]],
      format: ['', [Validators.required]],
    });
  }

  addDocument(): void {
    console.log(this.documentForm.value);
  }
}
