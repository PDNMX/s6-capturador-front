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
  /* Variable que contiene el objectId o id del mongo a actualizar */
  idGlobal: string = '66ad14627ebc3aae1c4b1534';
  /* Variable que contiene la propiedad para cambiar
   a editable o no los input que contienen la clase de readOnly */
  isReadOnly: boolean = false;
  /* Objeto que contiene los datos del formulario que se está capturando */
  datacontract = {
    id: '',
    data: {
      contract: {
      },
    },
  };
  contractsArrayToSend = [];

  registros: any[] = [];
  registroPorId = {};
  data: any;
  data1: any;
  data2: any;
  data3: any;
  data4: any;
regreso:any;
  /* Datos para enviar al api */
  id: string = '';
  dataToSend = {};
  dataToUpdate = {};
  contractData: any;
  /* Constructor para inicializar el formbuilder y el servicio el api */
  constructor(private fb: FormBuilder, private apiService: ApiService) {} //, private http: HttpClient) { }
  ngOnInit() {
    /* Cambiar por método getById para cargar una vez
    el contenido del ObjectId del ocid
    y llenar los campos del formulario con los datos del contrato
    en caso de que exista un contrato con ese id,
    almacenar el contrato en un arreglo
    */
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
    this.apiService.getMethod('/contracts/query').subscribe(
      (response: any) => {
        this.data = response;
        this.registros = response.results;
        console.log(
          '------------------------------------------------------------------------'
        );
        console.log('data recibida', this.data);
        console.log(
          '------------------------------------------------------------------------'
        );
        console.log('data recibida por la funcion', this.registros);
      },
      (error) => console.error('Error fetching data:', error)
    );
  }

  getMethodById(id: string): Observable<any> {
    return this.apiService.getMethodById<any>(id, '/contracts/getById/').pipe(
      map((data1: any) => {
        if (data1 && data1.record && data1.record.contract) {
          const contract = data1.record.contract;
          this.registroPorId = contract;
          console.log(
            'Data returned successfully by getMethodId:',
            this.registroPorId
          );
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
    this.apiService
    .postMethod<any>(dataToSend, '/contracts/insert')
    .subscribe(
      (data1: any) => {
        console.log('Data returned successfully:', data1);
        this.data1 = data1;
      },
      (error) => {
        console.error('Error returning data:', error.message);
      }
    );
  }

  putMethod(dataToUpdate: any) {
    this.apiService
      .putMethod(dataToUpdate, '/contracts/update')
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

/* Comienza sección de métodos para construir el objeto por subseccion */

/* Seccion general de contracts */
  addGeneralContractToArray(){
    alert('Contrato agregado al array');
    console.log('Contrato agregado al array');
    let contractSend = this.contracts.value;

    this.datacontract = {
      id: this.idGlobal,
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
          ...this.datacontract.data.contract,
        }

      }
    };
    console.log('Contrato agregado al array', this.datacontract);
  }

/*  Sección de documentos */
addDocumentsToArray() {
  console.log('Agregando documento al array');
  let documents = this.documents.value;

  // Si datacontract aún no existe, inicialízalo
  if (!this.datacontract) {
    this.datacontract = {
      id: this.idGlobal,
      data: {
        contract: {}
      }
    };
  }

  // Actualiza o agrega el nodo 'documents' manteniendo el resto de la información
  this.datacontract = {
    ...this.datacontract,
    data: {
      ...this.datacontract.data,
      contract: {
        ...this.datacontract.data.contract,
        documents
      }
    }
  };

  console.log('Documento agregado al array', this.datacontract);
}

/* Sección de items */
addItemsToArray() {
  console.log('Agregando item al array');
  let items = this.items.value;

  // Si datacontract aún no existe, inicialízalo
  if (!this.datacontract) {
    this.datacontract = {
      id: this.idGlobal,
      data: {
        contract: {}
      }
    };
  }

  // Actualiza o agrega el nodo 'documents' manteniendo el resto de la información
  this.datacontract = {
    ...this.datacontract,
    data: {
      ...this.datacontract.data,
      contract: {
        ...this.datacontract.data.contract,
        items
      }
    }
  };

  console.log('Documento agregado al array', this.datacontract);
}

/* Sección de garantías */
addGuaranteesToArray() {
  console.log('Agregando garantía al array');
  let guarantees = this.guarantees.value;
    // Si datacontract aún no existe, inicialízalo
    if (!this.datacontract) {
      this.datacontract = {
        id: this.idGlobal,
        data: {
          contract: {}
        }
      };
    }

    // Actualiza o agrega el nodo 'documents' manteniendo el resto de la información
    this.datacontract = {
      ...this.datacontract,
      data: {
        ...this.datacontract.data,
        contract: {
          ...this.datacontract.data.contract,
          guarantees
        }
      }
    };

    console.log('Documento agregado al array', this.datacontract);
  }

/* Sección de procesos relacionados */
addRelatedProcessesToArray() {
  console.log('Agregando proceso relacionado al array');
  let relatedProcesses = this.relatedProcesses.value;
    // Si datacontract aún no existe, inicialízalo
    if (!this.datacontract) {
      this.datacontract = {
        id: this.idGlobal,
        data: {
          contract: {}
        }
      };
    }

    // Actualiza o agrega el nodo 'documents' manteniendo el resto de la información
    this.datacontract = {
      ...this.datacontract,
      data: {
        ...this.datacontract.data,
        contract: {
          ...this.datacontract.data.contract,
          relatedProcesses
        }
      }
    };

    console.log('Documento agregado al array', this.datacontract);
  }

/* Sección de hitos */
addMilestonesToArray() {
  console.log('Agregando hito al array');
  let milestones = this.milestones.value;
    // Si datacontract aún no existe, inicialízalo
    if (!this.datacontract) {
      this.datacontract = {
        id: this.idGlobal,
        data: {
          contract: {}
        }
      };
    }

    // Actualiza o agrega el nodo 'documents' manteniendo el resto de la información
    this.datacontract = {
      ...this.datacontract,
      data: {
        ...this.datacontract.data,
        contract: {
          ...this.datacontract.data.contract,
          milestones
        }
      }
    };

    console.log('Documento agregado al array', this.datacontract);
  }

/* Sección de modificaciones */
addAmendmentsToArray() {
  console.log('Agregando modificación al array');
  let amendments = this.amendments.value;
    // Si datacontract aún no existe, inicialízalo
    if (!this.datacontract) {
      this.datacontract = {
        id: this.idGlobal,
        data: {
          contract: {}
        }
      };
    }

    // Actualiza o agrega el nodo 'documents' manteniendo el resto de la información
    this.datacontract = {
      ...this.datacontract,
      data: {
        ...this.datacontract.data,
        contract: {
          ...this.datacontract.data.contract,
          amendments
        }
      }
    };

    console.log('Documento agregado al array', this.datacontract);
  }

  /* Termina sección de métodos para construir el objeto por subseccion */

  /* Funciones para el formulario */

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
      id: this.idGlobal,
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

  refillElemet(registroId: string) {
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
              maxExtentDate: this.contractData.period.maxExtentDate,
            },
            value: this.contractData.value,
            dateSignedContracts: this.contractData.dateSignedContracts,
          });
          this.items.patchValue({
            id: this.contractData.items.id,
            description: this.contractData.items.description,
            clasification: this.contractData.items.clasification,
            additionalClassifications:
              this.contractData.items.additionalClassifications,
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
  /* Funciones para el formulario */
  /* Editar */
  editElement(registroId: string) {
    if (this.isReadOnly == true) {
      this.isReadOnly = false;
    } else {
      this.isReadOnly = false;
    }
    alert('Elemento editado ' + registroId);
    console.log('Elemento editado', registroId);
    this.isReadOnly = false;
    this.refillElemet(registroId);
  }
  /* Ver */
  viewElement(registroId: string) {
    alert('Elemento visto ' + registroId);
    console.log('Elemento visto', registroId);
    console.log('registro por id');
    this.isReadOnly = true;
    this.refillElemet(registroId);
  }
  /* Guardar */
  /*   onSubmit() {
    alert('Formulario enviado');
    console.log('Mandando datos');
    alert(this.datacontract);
    console.log(this.datacontract);
    let letrero: any = {};
    this.postMethod(this.datacontract);
    this.getMethod();
  } */

    /* Agregar contrato al array de contratos */
    addContracttoArraycontracts() {
      alert('Contrato agregado al array de contratos');
      console.log('Contrato agregado al array');
      
     };

  onSubmit(idGlobal: string) {
    alert('Formulario enviado');
    let encontrado = false;

    this.registroPorId = this.getMethodById(idGlobal).subscribe((contract) => {
      if (this.registroPorId) {
        this.addElementToObject();
        this.dataToUpdate = this.datacontract;
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

    /*     if (this.registroPorId) {
      this.dataToUpdate = this.datacontract;
      this.putMethod(this.dataToUpdate);
      encontrado = true;
    } */
  }
}
