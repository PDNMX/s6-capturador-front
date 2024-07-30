import { ApiService } from 'src/app/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.css'],
})
export class AwardsComponent implements OnInit {
  data: any;
  data1: any;
  /* Datos de ejemplo */
  dataToSend = {};
  /*   id: string = '1';
  dataToUpdate = {}; */

  constructor(private fb: FormBuilder, private apiService: ApiService) {}
  ngOnInit(): void {
    this.getMethod();
  }

  //Para ser usado con el api del s6
  postMethod(dataToSend: any) {
    this.apiService.postMethod<any>(dataToSend, '/awards/insert').subscribe(
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
    let dataaward: any = {
      id: this.awards.value.id,
      data: {
        award: this.awards.value,
      },
    };
    console.log('Mandando datos');
    console.log(dataaward);
    this.postMethod(dataaward);
  }

  onSubmitSuppliers() {
    console.log(this.suppliers.value);
    let datasupplier: any = {
      data: {
        supplier: this.suppliers.value,
      },
    };
    console.log('mandando datos de supplier');
    console.log(datasupplier);
    this.postMethod(datasupplier);
  }

  onSubmitItems() {
    console.log(this.items.value);
  }

  onSubmitDocuments() {
    console.log(this.documents.value);
  }

  onSubmitAwardsAmendments() {
    console.log(this.amendments.value);
  }
}
