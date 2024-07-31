import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Validators, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
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
  isReadOnly: boolean = false;
  registros: any[] = [];
  registroPorId = {};
  data: any;
  data1: any;
  data2: any;
  data3: any;
  data4: any;
  /* Datos para enviar al api */
  id: string = '';
  dataToSend = {};
  dataToUpdate = {};
  private datacontract = {};
contractData: any;
  /* Constructor para inicializar el formbuilder y el servicio el api */
  constructor(private fb: FormBuilder, private apiService: ApiService) {} //, private http: HttpClient) { }
  ngOnInit() {
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

  getMethodById(id: string): Observable<any> {
    return this.apiService.getMethodById<any>(id, '/contracts/getById/').pipe(
      map((data1:any) => {
        if (data1 && data1.record && data1.record.contract) {
          const contract = data1.record.contract;
          this.registroPorId = contract;
          console.log('Data returned successfully by getMethodId:', this.registroPorId);
          return contract;
        }
        return null;
      }),
      catchError((error) => {
        console.error('Error returning data by getMethodId:', error.message);
        return throwError(error);
      })
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
        },
      },
    };
    alert(this.datacontract);
    console.log('this.datacontract', this.datacontract);
  }

  /* Funciones para el formulario */
  /* Editar */
  editElement(registroId: string) {
    if(this.isReadOnly == true)
    {
      this.isReadOnly = false;
    }
    else{
      this.isReadOnly = false;
    }
    alert('Elemento editado ' + registroId);
    console.log('Elemento editado', registroId);
    this.isReadOnly = false;
    this.getMethodById(registroId).subscribe(
      (contract) => {
        if (contract) {
          this.contractData = contract;
          console.log('registro por id', this.contractData);
          console.log('Se mira algo?');
          this.contracts.patchValue({
            id: this.contractData.id,
            status: this.contractData.status,
            awardID: this.contractData.awardID,
            title: this.contractData.title,
            description: this.contractData.description,
            surveillanceMechanisms: this.contractData.surveillanceMechanisms,
            period: {
              startDate: this.contractData.period.startDate,
              endDate: this.contractData.period.endDate,
              durationInDays: this.contractData.period.durationInDays,
              maxExtentDate: this.contractData.period.maxExtentDate
            },
            value: this.contractData.value,
            dateSignedContracts: this.contractData.dateSignedContracts,
          });
          this.items.patchValue({
            id: this.contractData.items.id,
            description: this.contractData.items.description,
            clasification: this.contractData.items.clasification,
            additionalClassifications: this.contractData.items.additionalClassifications,
            quantity: this.contractData.items.quantity,
            unit: this.contractData.items.unit,
            deliveryLocation: this.contractData.items.deliveryLocation,
            deliveryAddress: this.contractData.items.deliveryAddress,
          });
          this.guarantees.patchValue({
            id: this.contractData.guarantees.id,
            type: this.contractData.guarantees.type,
            date: this.contractData.guarantees.date,
            obligations: this.contractData.guarantees.obligations,
            value: this.contractData.guarantees.value,
            guarantor: this.contractData.guarantees.guarantor,
            period: this.contractData.guarantees.period,
          });
          this.documents.patchValue({
            id: this.contractData.documents.id,
            documentType: this.contractData.documents.documentType,
            title: this.contractData.documents.title,
            description: this.contractData.documents.description,
            uri: this.contractData.documents.uri,
            datePublished: this.contractData.documents.datePublished,
            dateModified: this.contractData.documents.dateModified,
            format: this.contractData.documents.format,
          });
          this.relatedProcesses.patchValue({
            id: this.contractData.relatedProcesses.id,
            relationship: this.contractData.relatedProcesses.relationship,
            title: this.contractData.relatedProcesses.title,
            scheme: this.contractData.relatedProcesses.scheme,
            identifier: this.contractData.relatedProcesses.identifier,
            uri: this.contractData.relatedProcesses.uri,
          });
          this.milestones.patchValue({
            id: this.contractData.milestones.id,
            title: this.contractData.milestones.title,
            type: this.contractData.milestones.type,
            description: this.contractData.milestones.description,
            code: this.contractData.milestones.code,
            dueDate: this.contractData.milestones.dueDate,
            dateMet: this.contractData.milestones.dateMet,
            dateModified: this.contractData.milestones.dateModified,
            status: this.contractData.milestones.status,
          });
          this.amendments.patchValue({
            id: this.contractData.amendments.id,
            date: this.contractData.amendments.date,
            rationale: this.contractData.amendments.rationale,
            description: this.contractData.amendments.description,
            amendsReleaseID: this.contractData.amendments.amendsReleaseID,
            releaseID: this.contractData.amendments.releaseID,
          });
        }
      },
      (error) => {
        console.error('Error al obtener el contrato:', error);
      }
    );
  }
  /* Ver */
  viewElement(registroId: string) {
    alert('Elemento visto ' + registroId);
    console.log('Elemento visto', registroId);
    console.log('registro por id');
    this.isReadOnly = true;
    this.getMethodById(registroId).subscribe(
      (contract) => {
        if (contract) {
          this.contractData = contract;
          console.log('registro por id', this.contractData);
          console.log('Se mira algo?');
          this.contracts.patchValue({
            id: this.contractData.id,
            status: this.contractData.status,
            awardID: this.contractData.awardID,
            title: this.contractData.title,
            description: this.contractData.description,
            surveillanceMechanisms: this.contractData.surveillanceMechanisms,
            period:{
              startDate: this.contractData.period.startDate,
              endDate: this.contractData.period.endDate,
              durationInDays: this.contractData.period.durationInDays,
              maxExtentDate: this.contractData.period.maxExtentDate
            },
            value: this.contractData.value,
            dateSignedContracts: this.contractData.dateSignedContracts,
          });
          this.items.patchValue({
            id: this.contractData.items.id,
            description: this.contractData.items.description,
            clasification: this.contractData.items.clasification,
            additionalClassifications: this.contractData.items.additionalClassifications,
            quantity: this.contractData.items.quantity,
            unit: this.contractData.items.unit,
            deliveryLocation: this.contractData.items.deliveryLocation,
            deliveryAddress: this.contractData.items.deliveryAddress,
          });
          this.guarantees.patchValue({
            id: this.contractData.guarantees.id,
            type: this.contractData.guarantees.type,
            date: this.contractData.guarantees.date,
            obligations: this.contractData.guarantees.obligations,
            value: this.contractData.guarantees.value,
            guarantor: this.contractData.guarantees.guarantor,
            period: this.contractData.guarantees.period,
          });
          this.documents.patchValue({
            id: this.contractData.documents.id,
            documentType: this.contractData.documents.documentType,
            title: this.contractData.documents.title,
            description: this.contractData.documents.description,
            uri: this.contractData.documents.uri,
            datePublished: this.contractData.documents.datePublished,
            dateModified: this.contractData.documents.dateModified,
            format: this.contractData.documents.format,
          });
          this.relatedProcesses.patchValue({
            id: this.contractData.relatedProcesses.id,
            relationship: this.contractData.relatedProcesses.relationship,
            title: this.contractData.relatedProcesses.title,
            scheme: this.contractData.relatedProcesses.scheme,
            identifier: this.contractData.relatedProcesses.identifier,
            uri: this.contractData.relatedProcesses.uri,
          });
          this.milestones.patchValue({
            id: this.contractData.milestones.id,
            title: this.contractData.milestones.title,
            type: this.contractData.milestones.type,
            description: this.contractData.milestones.description,
            code: this.contractData.milestones.code,
            dueDate: this.contractData.milestones.dueDate,
            dateMet: this.contractData.milestones.dateMet,
            dateModified: this.contractData.milestones.dateModified,
            status: this.contractData.milestones.status,
          });
          this.amendments.patchValue({
            id: this.contractData.amendments.id,
            date: this.contractData.amendments.date,
            rationale: this.contractData.amendments.rationale,
            description: this.contractData.amendments.description,
            amendsReleaseID: this.contractData.amendments.amendsReleaseID,
            releaseID: this.contractData.amendments.releaseID,
          });
        }
      },
      (error) => {
        console.error('Error al obtener el contrato:', error);
      }
    );
  }
  /* Guardar */
  onSubmit() {
    alert('Formulario enviado');
    console.log('Mandando datos');
    alert(this.datacontract);
    console.log(this.datacontract);
    let letrero: any = {};
    this.postMethod(this.datacontract);
    this.getMethod();
  }
}
