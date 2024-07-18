import { ApiService } from './../../api.service';
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
  sendAwards: any = {};

  constructor(private fb: FormBuilder, private apiService: ApiService) {}
  ngOnInit(): void {
    this.obtenerDatos();
    this.postMethod();
  }

  obtenerDatos() {
    this.apiService.getMethod('/albums').subscribe((data) => {
      this.data = data;
      console.log(this.data);
    });
  }

  postMethod(): void {
    this.apiService.postMethod<any>(this.sendAwards, 'posts').subscribe(
      (data1: any) => {
        console.log('Datos devueltos correctamente:', data1);
        this.data1 = data1;
        // Handle successful response (e.g., update UI)
      },
      (error) => {
        console.error('Error al devolver los datos:', error.message);
        // Handle error (e.g., display error message to user)
      }
    );
  }

  Awards = this.fb.group({
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

  AwardsSuppliers = this.fb.group({
    suppliers: this.fb.group({
      id: [''],
      name: [''],
    }),
  });

  AwardsItems = this.fb.group({
    items: this.fb.group({
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
    }),
  });

  AwardsDocuments = this.fb.group({
    documents: this.fb.group({
      id: ['', Validators.required],
      documentType: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      url: ['', Validators.required],
      datePublished: ['', Validators.required],
      dateModified: ['', Validators.required],
      format: ['', Validators.required],
      language: ['', Validators.required],
    }),
  });

  AwardsAmendments = this.fb.group({
    amendments: this.fb.group({
      date: ['', Validators.required],
      rationale: ['', Validators.required],
      id: ['', Validators.required],
      description: ['', Validators.required],
      amendsReleaseID: ['', Validators.required],
      releaseID: ['', Validators.required],
    }),
  });

  onSubmit() {
    console.log(this.Awards.value);
  }

  onSubmitSuppliers() {
    console.log(this.AwardsSuppliers.value);
  }

  onSubmitItems() {
    console.log(this.AwardsItems.value);
  }

  onSubmitDocuments() {
    console.log(this.AwardsDocuments.value);
  }

  onSubmitAwardsAmendments() {
    console.log(this.AwardsAmendments.value);
  }
}
