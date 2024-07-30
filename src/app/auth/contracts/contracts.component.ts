import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Validators, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
//import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/api.service';
//import { Contract } from './contract.model';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css'],
})


export class ContractsComponent implements OnInit {
  /* Lo que regresan los endpoint's */
  registros: any[] = [];
  registroPorId: any;
  data: any;
  data1: any;
  data2: any;
  data3: any;
  data4: any;
  /* Datos para enviar al api */
  id: string = '';
  dataToSend = {};
  dataToUpdate = {};
  private datacontract  = {};

  /* Constructor para inicializar el formbuilder y el servicio el api */
  constructor(private fb: FormBuilder, private apiService: ApiService) {} //, private http: HttpClient) { }
  ngOnInit(){
    this.getMethod();

  }

  /* Construyendo el objeto de contracts con formbuilder */
    contracts = this.fb.group({
      id: ['', Validators.required],
      status: ['', Validators.required],
      awardID: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      surveillanceMechanisms: ['', Validators.required],
      period: this.fb.group({
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        durationInDays: ['', Validators.required],
        maxExtentDate: ['', Validators.required],
      }),
      value: this.fb.group({
        amount: ['', Validators.required],
        amountNet: ['', Validators.required],
        currency: ['', Validators.required],
      }),
      dateSignedContracts: this.fb.group({
        dateSigned: ['', Validators.required],
      }),
    });

  items = this.fb.group({
    id: ['', Validators.required],
    description: ['', Validators.required],
    clasification: this.fb.group({
      scheme: ['', Validators.required],
      id: ['', Validators.required],
      uri: ['', Validators.required],
      description: ['', Validators.required],
    }),
    /*       additionalClassifications: this.fb.FormArray([
        this.fb.group({
          scheme: ['', Validators.required],
          id: ['', Validators.required],
          uri: ['', Validators.required],
          description: ['', Validators.required]
        })
      ]), */
    additionalClassifications: this.fb.group({
      scheme: ['', Validators.required],
      id: ['', Validators.required],
      uri: ['', Validators.required],
      description: ['', Validators.required],
    }),
    quantity: ['', Validators.required],
    unit: this.fb.group({
      scheme: ['', Validators.required],
      id: ['', Validators.required],
      name: ['', Validators.required],
      uri: ['', Validators.required],
      value: this.fb.group({
        amount: ['', Validators.required],
        currency: ['', Validators.required],
      }),
    }),
    deliveryLocation: this.fb.group({
      uri: ['', Validators.required],
      description: ['', Validators.required],
      geometry: this.fb.group({
        type: ['', Validators.required],
        coordinates: this.fb.group({
          latitude: ['', Validators.required],
          longitude: ['', Validators.required],
        }),
        gazetteer: this.fb.group({
          scheme: ['', Validators.required],
          identifiers: ['', Validators.required],
        }),
      }),
    }),
    deliveryAddress: this.fb.group({
      uri: ['', Validators.required],
      description: ['', Validators.required],
      streetAddress: ['', Validators.required],
      locality: ['', Validators.required],
      region: ['', Validators.required],
      postalCode: ['', Validators.required],
      countryName: ['', Validators.required],
    }),
  });

  guarantees = this.fb.group({
    id: ['', Validators.required],
    type: ['', Validators.required],
    date: ['', Validators.required],
    obligations: ['', Validators.required],
    value: this.fb.group({
      amount: ['', Validators.required],
      currency: ['', Validators.required],
    }),
    guarantor: this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
    }),
    period: this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      durationInDays: ['', Validators.required],
      maxExtentDate: ['', Validators.required],
    }),
  });

  documents = this.fb.group({
    id: ['', Validators.required],
    documentType: ['', Validators.required],
    title: ['', Validators.required],
    description: ['', Validators.required],
    uri: ['', Validators.required],
    datePublished: ['', Validators.required],
    dateModified: ['', Validators.required],
    format: ['', Validators.required],
    language: ['', Validators.required],
  });

  relatedProcesses = this.fb.group({
    id: ['', Validators.required],
    relationship: ['', Validators.required],
    title: ['', Validators.required],
    scheme: ['', Validators.required],
    identifier: ['', Validators.required],
    uri: ['', Validators.required],
  });

  milestones = this.fb.group({
    id: ['', Validators.required],
    title: ['', Validators.required],
    type: ['', Validators.required],
    description: ['', Validators.required],
    code: ['', Validators.required],
    dueDate: ['', Validators.required],
    dateMet: ['', Validators.required],
    dateModified: ['', Validators.required],
    status: ['', Validators.required],
  });

  amendments = this.fb.group({
    id: ['', Validators.required],
    date: ['', Validators.required],
    rationale: ['', Validators.required],
    description: ['', Validators.required],
    amendsReleaseID: ['', Validators.required],
    releaseID: ['', Validators.required],
  });

  /* Métodos para llamar al api */

  getMethod(): void {
    this.apiService.getMethod('/contracts/getAll').subscribe(
      (response: any) => {
        this.data = response;
        this.registros = response.results;
        console.log('data recibida por la funcion', this.registros);
      },
      (error) => console.error('Error fetching data:', error)
    );
  }

  postMethod(dataToSend: any) {
    this.apiService.postMethod<any>(dataToSend, '/contracts/insert').subscribe(
      (data1: any) => {
        console.log('Data returned successfully:', data1);
        this.data1 = data1;
      },
      (error) => {
        console.error('Error returning data:', error.message);
      }
    );
  }

  putMethod() {
    this.apiService
      .putMethod<any>(this.id, this.dataToUpdate, '/posts/1')
      .subscribe(
        (data2: any) => {
          console.log('Data updated successfully:', data2);
          this.data2 = data2;
          // Handle successful response (e.g., update UI)
        },
        (error) => {
          console.error('Error updating data:', error.message);
          // Handle error (e.g., display error message to user)
        }
      );
  }

  getMethodById(id: string) {
    this.apiService.getMethodById<any>(id, '/contracts/getById/').subscribe(
      (data1: any) => {
        this.registroPorId = data1;
        console.log('Data returned successfully by getMethodId:', this.registroPorId);
      },
      (error) => {
        console.error('Error returning data by getMethodId:', error.message);
      }
    );
  }

  deleteMethod() {
    this.apiService.deleteMethod<any>(this.id, '/posts/${id}').subscribe(
      (data3: any) => {
        console.log('Data deleted successfully:', data3);
        this.data3 = data3;
        // Handle successful response (e.g., update UI)
      },
      (error) => {
        console.error('Error deleting data:', error.message);
        // Handle error (e.g., display error message to user)
      }
    );
  }
  /* Métodos para llamar al api */

  /* Funciones para el formulario */
  addClasification() {
    alert('Clasificación agregada');
  }

  addElementToObject() {
    alert('Elemento agregado');
    let contractSend = this.contracts.value;
    let items = this.items.value;
    let guarantees = this.guarantees.value;
    let documents = this.documents.value;
    let relatedProcesses = this.relatedProcesses.value;
    let milestones = this.milestones.value;
    let amendments = this.amendments.value;

    this.datacontract = {
      id: this.id,
      data: {
        contract: {
          id: contractSend.id,
          status: contractSend.status,
          awardID: contractSend.awardID,
          title: contractSend.title,
          description: contractSend.description,
          surveillanceMechanisms: contractSend.surveillanceMechanisms,
          period: contractSend.period,
          value: contractSend.value,
          dateSignedContracts: contractSend.dateSignedContracts,
          items,
          guarantees,
          documents,
          relatedProcesses,
          milestones,
          amendments,
        }
      },
    };
    alert(this.datacontract);
    console.log('this.datacontract', this.datacontract);
  }

  /* Funciones para el formulario */
  /* Ver */
  viewElement(registroId:string) {
    alert('Elemento visto ' + registroId);
console.log('Elemento visto', registroId);
this.registroPorId =  this.getMethodById(registroId);
console.log('Elemento visto desde mongoDB', this.registroPorId);
  }
  /* Guardar */
  onSubmit() {
    console.log('holi desde funcion principal onsubmit');
    alert('Formulario enviado');
    console.log('Mandando datos');
    alert(this.datacontract);
    console.log(this.datacontract);
    let letrero: any = {};
    letrero = this.postMethod(this.datacontract);
    this.getMethod();
  };

}
