import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.css'],
})
export class AwardsComponent implements OnInit {
  data: any;
  data1: any;
  savingMessage: string = '';
  isSaving: boolean = false;
  /* Datos de ejemplo */
  //dataToSend = {};
  /*   id: string = '1';
  dataToUpdate = {}; */

  //Almacenar los datos temporalmente para cada sección
  tempAwards: any = {
    suppliers: [],
    items: [],
    documents: [],
    amendments: [],
  };

  constructor(private fb: FormBuilder, private apiService: ApiService) {}
  ngOnInit(): void {
    this.getMethod();
  }

  //Para ser usado con el api del s6
  postMethod(dataToSend: any) {
    this.apiService.postMethod<any>(dataToSend, 'awards/insert').subscribe(
      (data1: any) => {
        console.log('Data returned successfully:', data1);
        this.data1 = data1;
        // Handle successful response (e.g., update UI)
      },
      (error) => {
        console.error('Error returning data:', error.message);
        // Handle error (e.g., display error message to user)
      }
    );
  }

  // Método para ser usado con el api del s6
  getMethod(): void {
    this.apiService.getMethod('/get').subscribe(
      (data) => {
        this.data = data;
        console.log('data recibida por la funcion', data);
      },
      (error) => console.error('Error fetching data:', error)
    );
  }
  /* Mostrar en consolo el contenido de los formularios */

  awards = this.fb.group({
    id: ['', Validators.required],
    status: ['', Validators.required],
    title: ['', Validators.required],
    description: ['', Validators.required],
    rationale: ['', Validators.required],
    date: ['', Validators.required],
    value: this.fb.group({
      amount: ['', Validators.required],
      currency: ['', Validators.required],
    }),
    contractPeriod: this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      maxExtentDate: ['', Validators.required],
      durationInDays: ['', Validators.required],
    }),
  });

  suppliers = this.fb.group({
    id: ['', Validators.required],
    name: ['', Validators.required],
  });

  items = this.fb.group({
    id: ['', Validators.required],
    description: ['', Validators.required],
    quantity: ['', Validators.required],
    unit: this.fb.group({
      id: [''],
      scheme: [''],
      name: [''],
      uri: [''],
      value: this.fb.group({
        amount: [''],
        currency: [''],
      }),
    }),
    classification: this.fb.group({
      id: ['', Validators.required],
      description: ['', Validators.required],
      scheme: [''],
      uri: [''],
    }),
    additionalClassifications: this.fb.group({
      id: ['', Validators.required],
      description: ['', Validators.required],
      scheme: [''],
      uri: [''],
    }),
  });

  documents = this.fb.group({
    id: ['', Validators.required],
    documentType: ['', Validators.required],
    title: ['', Validators.required],
    description: ['', Validators.required],
    url: ['', Validators.required],
    datePublished: ['', Validators.required],
    dateModified: ['', Validators.required],
    format: ['', Validators.required],
    language: ['', Validators.required],
  });

  amendments = this.fb.group({
    date: ['', Validators.required],
    rationale: ['', Validators.required],
    id: ['', Validators.required],
    description: ['', Validators.required],
    amendsReleaseID: ['', Validators.required],
    releaseID: ['', Validators.required],
  });

  onSubmit() {
    console.log(this.awards.value);
    this.tempAwards = { ...this.tempAwards, ...this.awards.value };
    this.showSavingMessage();
    this.awards.reset();
  }

  onSubmitSuppliers() {
    console.log(this.suppliers.value);
    this.tempAwards.suppliers.push(this.suppliers.value);
    this.showSavingMessage();
    this.suppliers.reset();
  }

  onSubmitItems() {
    console.log(this.items.value);
    this.tempAwards.items.push(this.items.value);
    this.showSavingMessage();
    this.items.reset();
  }

  onSubmitDocuments() {
    console.log(this.documents.value);
    this.tempAwards.documents.push(this.documents.value);
    this.showSavingMessage();
    this.documents.reset();
  }

  onSubmitAwardsAmendments() {
    console.log(this.amendments.value);
    this.tempAwards.amendments.push(this.amendments.value);
    this.showSavingMessage();
    this.documents.reset();
  }

  //Metodo del mensaje guardando
  showSavingMessage() {
    this.isSaving = true;
    this.savingMessage = 'Guardando...';
    setTimeout(() => {
      this.isSaving = false;
      this.savingMessage = '';
    }, 3000);
  }

  //Metodo para combinar y enviar todos los datos
  submitAllSections() {
    const finalData = {
      id: this.tempAwards.id,
      data: {
        award: {
          ...this.tempAwards,
          suppliers: this.tempAwards.suppliers,
        },
      },
    };
    console.log('Enviando todos los datos', finalData);
    this.postMethod(finalData);
  }
}
