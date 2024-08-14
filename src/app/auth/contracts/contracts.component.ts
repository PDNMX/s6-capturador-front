import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Validators, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { map, Observable, of, tap, catchError, throwError } from 'rxjs';
//import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/api.service';
//import { Contract } from './contract.model';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css'],
})

export class ContractsComponent implements OnInit {
  /* Variable que contiene el objectId o id del mongo a actualizar */
  idGlobal: string = '66ad14627ebc3aae1c4b1534';
  /* Variable que contiene la propiedad para cambiar
   a editable o no los input que contienen la clase de readOnly */
  isReadOnly: boolean = false;
  /* Objeto que contiene los datos del formulario que se está capturando */
  datacontract: any = {};
  contractsArrayToSend: any[] = [];
  /* Variable que contendrá el registro devuelto por el findbyId */
  registroPorId: any;
  data: any;

  //validar uso de las siguientes variables

  /* borrar eventualmente */

  data1:any
  data2: any;
  data4: any;
  regreso: any;
  /* Datos para enviar al api */
  id: string = '';
  dataToSend = {};
  dataToUpdate = {};
  contractData: any;

  /* Constructor para inicializar el formbuilder y el servicio el api */
  constructor(private fb: FormBuilder, private apiService: ApiService) {} //, private http: HttpClient) { }
  ngOnInit() {
    //this.getMethod();
    this.getMethodById(this.idGlobal);
  }

  /* Método para generar un id para cada contrato agregado al arreglo de contratos del OCID */
  generarId(): string {
    return uuidv4();
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

  /* Métodos para llamar al api desde el servicio */
  /* No usado */
  getMethod(): void {
    this.apiService.getMethod('/contracts/query').subscribe(
      (response: any) => {
        this.data1 = response;
        //this.registros = response.results;
        console.log(
          '------------------------------------------------------------------------'
        );
        console.log('data1 recibida', this.data1);
        console.log(
          '------------------------------------------------------------------------'
        );
        // console.log('data recibida por la funcion', this.registros);
      },
      (error) => console.error('Error fetching data:', error)
    );
  }

  /* Obtener el registro de la colección correspondiente al OCID en curso */
  getMethodById(id: string): void {
    this.apiService.getMethodById<any>(id, '/contracts/getById').subscribe(
      (data) => {
        this.registroPorId = data;
        console.log('Datos obtenidos:', this.registroPorId.record);
      },
      (error) => {
        console.error('Error al obtener data:', error);
      }
    );
  }

/* Con un observable */
/* getMethodById(id: string): Observable<any> {
  return this.apiService.getMethodById<any>(id, '/contracts/getById').pipe(
    tap((data1) => {
      this.registroPorId = data1;
      console.log('data1 obtenidos:', this.registroPorId);
    }),
    catchError((error) => {
      console.error('Error al obtener data1:', error);
      return throwError(error);
    })
  );
} */

/* Método para llamar el servicio y actualizar */
  putMethod(dataToUpdate: any) {
    this.apiService.putMethod(dataToUpdate, '/contracts/update').subscribe(
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

  /* Comienza sección de métodos para construir el objeto por subseccion */
  /* Seccion general de contracts */
  addGeneralContractToArray() {
    let contractSend = this.contracts.value;

    this.datacontract = {
      _id: this.generarId(),
      id: contractSend.id,
      status: contractSend.status,
      awardID: contractSend.awardID,
      title: contractSend.title,
      description: contractSend.description,
      surveillanceMechanisms: contractSend.surveillanceMechanisms,
      period: contractSend.period,
      value: contractSend.value,
      dateSignedContracts: contractSend.dateSignedContracts,
      ...this.datacontract.contract,
    };
    console.log('Contrato agregado al array', this.datacontract);
  }

  /*  Sección de documentos */
  addDocumentsToArray() {
    console.log('Agregando documento al array');
    let documents = this.documents.value;
    // Actualiza o agrega el nodo 'documents' manteniendo el resto de la información
    this.datacontract = {
      ...this.datacontract,
      documents,
    };

    console.log('Documento agregado al array', this.datacontract);
  }

  /* Sección de items */
  addItemsToArray() {
    console.log('Agregando item al array');
    let items = this.items.value;
    // Actualiza o agrega el nodo 'documents' manteniendo el resto de la información
    this.datacontract = {
      ...this.datacontract,
      items,
    };

    console.log('Ítem agregado al array', this.datacontract);
  }

  /* Sección de garantías */
  addGuaranteesToArray() {
    console.log('Agregando garantía al array');
    let guarantees = this.guarantees.value;
    // Actualiza o agrega el nodo 'documents' manteniendo el resto de la información
    this.datacontract = {
      ...this.datacontract,
      guarantees,
    };

    console.log('Gaarntía agregada al array', this.datacontract);
  }

  /* Sección de procesos relacionados */
  addRelatedProcessesToArray() {
    console.log('Agregando proceso relacionado al array');
    let relatedProcesses = this.relatedProcesses.value;
    // Actualiza o agrega el nodo 'documents' manteniendo el resto de la información
    this.datacontract = {
      ...this.datacontract,
      relatedProcesses,
    };

    console.log('Proceso agregado al array', this.datacontract);
  }

  /* Sección de hitos */
  addMilestonesToArray() {
    console.log('Agregando hito al array');
    let milestones = this.milestones.value;
    // Actualiza o agrega el nodo 'documents' manteniendo el resto de la información
    this.datacontract = {
      ...this.datacontract,
      milestones,
    };
    console.log('Hito agregado al array', this.datacontract);
  }

  /* Sección de modificaciones */
  addAmendmentsToArray() {
    console.log('Agregando modificación al array');
    let amendments = this.amendments.value;
    // Actualiza o agrega el nodo 'documents' manteniendo el resto de la información
    this.datacontract = {
      ...this.datacontract,
      amendments,
    };
    console.log('Enmienda agregado al array', this.datacontract);
  }

  /* Termina sección de métodos para construir el objeto por subseccion */

  /* Funciones para el formulario */
  /* Función implementada unicamente para desarrollo, el objeto se construye por sección */
  addElementToObject() {
    //alert('Elemento agregado');
    let contractSend = this.contracts.value;
    let items = this.items.value;
    let guarantees = this.guarantees.value;
    let documents = this.documents.value;
    let relatedProcesses = this.relatedProcesses.value;
    let milestones = this.milestones.value;
    let amendments = this.amendments.value;

    this.datacontract = {
      _id: this.generarId(),
      id: contractSend.id,
      status: contractSend.status,
      awardID: contractSend.awardID,
      title: contractSend.title,
      description: contractSend.description,
      surveillanceMechanisms: contractSend.surveillanceMechanisms,
      period: contractSend.period,
      value: contractSend.value,
      dateSignedContracts: contractSend.dateSignedContracts,
      items: {
        id: items.id,
        description: items.description,
        clasification: items.clasification,
        additionalClassifications: items.additionalClassifications,
        quantity: items.quantity,
        unit: items.unit,
        deliveryLocation: items.deliveryLocation,
        deliveryAddress: items.deliveryAddress,
      },
      guarantees: {
        id: guarantees.id,
        type: guarantees.type,
        date: guarantees.date,
        obligations: guarantees.obligations,
        value: guarantees.value,
        guarantor: guarantees.guarantor,
        period: guarantees.period,
      },
      documents: {
        id: documents.id,
        documentType: documents.documentType,
        title: documents.title,
        description: documents.description,
        uri: documents.uri,
        datePublished: documents.datePublished,
        dateModified: documents.dateModified,
        format: documents.format,
      },
      relatedProcesses: {
        id: relatedProcesses.id,
        relationship: relatedProcesses.relationship,
        title: relatedProcesses.title,
        scheme: relatedProcesses.scheme,
        identifier: relatedProcesses.identifier,
        uri: relatedProcesses.uri,
      },
      milestones: {
        id: milestones.id,
        title: milestones.title,
        type: milestones.type,
        description: milestones.description,
        code: milestones.code,
        dueDate: milestones.dueDate,
        dateMet: milestones.dateMet,
        dateModified: milestones.dateModified,
        status: milestones.status,
      },
      amendments: {
        id: amendments.id,
        date: amendments.date,
        rationale: amendments.rationale,
        description: amendments.description,
        amendsReleaseID: amendments.amendsReleaseID,
        releaseID: amendments.releaseID,
      },
    };
  }

  /* Quitar valores capturados de los input(formbuilder) */
  resetForm() {
    // Resetea el formulario principal
    this.contracts.reset();
    // Resetea los subformularios
    this.items.reset();
    this.guarantees.reset();
    this.documents.reset();
    this.relatedProcesses.reset();
    this.milestones.reset();
    this.amendments.reset();
  }

  refillElemet(contrato_id: string, )
 {
  alert('registro por id');
  console.log('registro por id');
  console.log('contrato_id: ',contrato_id);
  this.contracts.patchValue({
    id: this.registroPorId.record.id,
    status: this.registroPorId.record.status,
    awardID: this.registroPorId.record.awardID,
    title: this.registroPorId.record.title,
    description: this.registroPorId.record.description,
    surveillanceMechanisms: this.registroPorId.record.surveillanceMechanisms,
    period: {
      startDate: this.registroPorId.record.period.startDate,
      endDate: this.registroPorId.record.period.endDate,
      durationInDays: this.registroPorId.record.period.durationInDays,
      maxExtentDate: this.registroPorId.record.period.maxExtentDate,
    },
    value: {
      amount: this.registroPorId.record.value.amount,
      amountNet: this.registroPorId.record.value.amountNet,
      currency: this.registroPorId.record.value.currency,
    },
    dateSignedContracts: {
      dateSigned: this.registroPorId.record.dateSignedContracts.dateSigned,
    },
  });
  this.items.patchValue({
    id: this.registroPorId.record.items.id,
    description: this.registroPorId.record.items.description,
    clasification: {
      scheme: this.registroPorId.record.items.clasification.scheme,
      id: this.registroPorId.record.items.clasification.id,
      uri: this.registroPorId.record.items.clasification.uri,
      description: this.registroPorId.record.items.clasification.description,
    },
    additionalClassifications: {
      scheme: this.registroPorId.record.items.additionalClassifications.scheme,
      id: this.registroPorId.record.items.additionalClassifications.id,
      uri: this.registroPorId.record.items.additionalClassifications.uri,
      description: this.registroPorId.record.items.additionalClassifications.description,
    },
    quantity: this.registroPorId.record.items.quantity,
    unit: {
      scheme: this.registroPorId.record.items.unit.scheme,
      id: this.registroPorId.record.items.unit.id,
      name: this.registroPorId.record.items.unit.name,
      uri: this.registroPorId.record.items.unit.uri,
      value: {
        amount: this.registroPorId.record.items.unit.value.amount,
        currency: this.registroPorId.record.items.unit.value.currency,
      },
    },
    deliveryLocation: {
      uri: this.registroPorId.record.items.deliveryLocation.uri,
      description: this.registroPorId.record.items.deliveryLocation.description,
      geometry: {
        type: this.registroPorId.record.items.deliveryLocation.geometry.type,
        coordinates: {
          latitude: this.registroPorId.record.items.deliveryLocation.geometry.coordinates.latitude,
          longitude: this.registroPorId.record.items.deliveryLocation.geometry.coordinates.longitude,
        },
        gazetteer: {
          scheme: this.registroPorId.record.items.deliveryLocation.geometry.gazetteer.scheme,
          identifiers: this.registroPorId.record.items.deliveryLocation.geometry.gazetteer.identifiers,
        },
      },
    },
    deliveryAddress: {
      uri: this.registroPorId.record.items.deliveryAddress.uri,
      description: this.registroPorId.record.items.deliveryAddress.description,
      streetAddress: this.registroPorId.record.items.deliveryAddress.streetAddress,
      locality: this.registroPorId.record.items.deliveryAddress.locality,
      region: this.registroPorId.record.items.deliveryAddress.region,
      postalCode: this.registroPorId.record.items.deliveryAddress.postalCode,
      countryName: this.registroPorId.record.items.deliveryAddress.countryName,
    },
  });
  this.guarantees.patchValue({
    id: this.registroPorId.record.guarantees.id,
    type: this.registroPorId.record.guarantees.type,
    date: this.registroPorId.record.guarantees.date,
    obligations: this.registroPorId.record.guarantees.obligations,
    value: {
      amount: this.registroPorId.record.guarantees.value.amount,
      currency: this.registroPorId.record.guarantees.value.currency,
    },
    guarantor: {
      id: this.registroPorId.record.guarantees.guarantor.id,
      name: this.registroPorId.record.guarantees.guarantor.name,
    },
    period: {
      startDate: this.registroPorId.record.guarantees.period.startDate,
      endDate: this.registroPorId.record.guarantees.period.endDate,
      durationInDays: this.registroPorId.record.guarantees.period.durationInDays,
      maxExtentDate: this.registroPorId.record.guarantees.period.maxExtentDate,
    },
  });
  this.documents.patchValue({
    id: this.registroPorId.record.documents.id,
    documentType: this.registroPorId.record.documents.documentType,
    title: this.registroPorId.record.documents.title,
    description: this.registroPorId.record.documents.description,
    uri: this.registroPorId.record.documents.uri,
    datePublished: this.registroPorId.record.documents.datePublished,
    dateModified: this.registroPorId.record.documents.dateModified,
    format: this.registroPorId.record.documents.format,
  });
  this.relatedProcesses.patchValue({
    id: this.registroPorId.record.relatedProcesses.id,
    relationship: this.registroPorId.record.relatedProcesses.relationship,
    title: this.registroPorId.record.relatedProcesses.title,
    scheme: this.registroPorId.record.relatedProcesses.scheme,
    identifier: this.registroPorId.record.relatedProcesses.identifier,
    uri: this.registroPorId.record.relatedProcesses.uri,
  });
  this.milestones.patchValue({
    id: this.registroPorId.record.milestones.id,
    title: this.registroPorId.record.milestones.title,
    type: this.registroPorId.record.milestones.type,
    description: this.registroPorId.record.milestones.description,
    code: this.registroPorId.record.milestones.code,
    dueDate: this.registroPorId.record.milestones.dueDate,
    dateMet: this.registroPorId.record.milestones.dateMet,
    dateModified: this.registroPorId.record.milestones.dateModified,
    status: this.registroPorId.record.milestones.status,
  });
  this.amendments.patchValue({
    id: this.registroPorId.record.amendments.id,
    date: this.registroPorId.record.amendments.date,
    rationale: this.registroPorId.record.amendments.rationale,
    description: this.registroPorId.record.amendments.description,
    amendsReleaseID: this.registroPorId.record.amendments.amendsReleaseID,
    releaseID: this.registroPorId.record.amendments.releaseID,
  });


  //console.log(this.registroPorId.record);
 }

  /* Funciones para el formulario */
  /* Editar */
  editElement(contrato_id: string) {
    if (this.isReadOnly == true) {
      this.isReadOnly = false;
    } else {
      this.isReadOnly = false;
    }
    alert('Elemento editado ' + contrato_id);
    console.log('Elemento editado', contrato_id);
    this.isReadOnly = false;
    this.refillElemet(contrato_id);
  }

  /* Ver */
/*   viewElement(registroId: string) {
    alert('Elemento visto ' + registroId);
    console.log('Elemento visto', registroId);
    console.log('registro por id');
    this.isReadOnly = true;
    this.refillElemet(registroId);
  } */

  /* Agregar contrato al array de contratos */
  addContracttoArraycontracts() {
    //alert('Contrato agregado al array...');
    this.addElementToObject();
    this.contractsArrayToSend.push(this.datacontract);
    this.resetForm();
    console.log('Contrato agregado al array', this.contractsArrayToSend);
  }

/*   onSubmit(idGlobal: string) {
    alert('Formulario enviado');
    let encontrado = false;
    this.addElementToObject();
    this.registroPorId = this.getMethodById(idGlobal).subscribe((contract) => {
      if (this.registroPorId) {
        //modificar lo que se va a enviar al api
        //this.dataToUpdate = this.contractsArrayToSend;
        this.dataToUpdate = {
          id: this.idGlobal,
          data: {
            contract: [this.contractsArrayToSend],
          },
        };
        console.log('data to update', this.dataToUpdate);
        this.putMethod(this.dataToUpdate);
        encontrado = true;
        this.resetForm();
        this.getMethod();
      } else {
        console.log('No se encontró el registro');
        alert('No se encontró el registro, intente más tarde');
      }
    });
  } */

onSubmit(idGlobal: string)
{
  let encontrado = false;
 /* crear el objeto usando todo el formbuild  */
  this.addElementToObject();
/* Crear nuevo arreglo para ser enviado al método update  */
this.dataToUpdate = {
  id: this.idGlobal,
  data: {
    ...this.registroPorId.record.contracts,
    contracts: this.contractsArrayToSend,
  },
};

//console.log('data to update', this.dataToUpdate);

if(this.registroPorId.record)
{
  encontrado = true;
  this.putMethod(this.dataToUpdate);
  this.resetForm();
  //this.getMethod();
} else {
    console.log('No se encontró el registro');
    alert('No se encontró el registro, intente más tarde');
  }
}

/* onSubmit(idGlobal: string)
{
  //alert('Formulario enviado');
  let encontrado = false;
  this.addElementToObject();
  this.registroPorId = this.getMethodById(idGlobal);
  if (this.registroPorId.record) {
    //modificar lo que se va a enviar al api
    //this.dataToUpdate = this.contractsArrayToSend;
    this.dataToUpdate = {
      id: this.idGlobal,
      data: {
        contracts: [this.contractsArrayToSend],
      },
    };
    console.log('data to update', this.dataToUpdate);
/*     this.putMethod(this.dataToUpdate);
    encontrado = true;
    this.resetForm();
    this.getMethod(); */
  /*} else {
    console.log('No se encontró el registro');
    alert('No se encontró el registro, intente más tarde');
  }
} */
}
