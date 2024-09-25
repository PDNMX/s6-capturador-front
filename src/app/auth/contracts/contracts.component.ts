import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Validators, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { map, Observable, of, tap, catchError, throwError } from 'rxjs';
//import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import { Contract } from './contract.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css'],
})

export class ContractsComponent implements OnInit {
  /* Variable que contiene el objectId o id del mongo a actualizar */
  idGlobal: string = '';
  /* Variable que contiene la propiedad para cambiar
   a editable o no los input que contienen la clase de readOnly */
   isReadOnly: boolean = false;
  /* Objeto que contiene los datos del formulario que se está capturando */
  datacontract: any = {};
  contractsArrayToSend: any[] = [];
  /* Variable que contendrá el registro devuelto por el findbyId */
  registroPorId: any;
  data: any;
  banderaEditar: boolean = false;
  contratoId: string = '';

  // para construir el objeto de contratos a actualizar en su respectivo globalId
  contract: any;

  //validar uso de las siguientes variables

  /* borrar eventualmente */
  data1: any;
  data2: any;
  data4: any;
  regreso: any;

  /* Datos para enviar al api */
  id: string = '';
  dataToSend = {};
  dataToUpdate = {};
  contractData: any;

  /* Constructor para inicializar el formbuilder y el servicio el api */
  constructor(private fb: FormBuilder, private apiService: ApiService, private route: ActivatedRoute) {} //, private http: HttpClient) { }

  ngOnInit() {

    this.getMethodById(this.idGlobal);
    
    this.route.paramMap.subscribe((params:any) => 
      {
        const id = params.get('id');
        this.idGlobal = id;
        console.log('contract id: ', id);
      });
/*     this.getMethodById(this.idGlobal);
    console.log('registro de la base de datos obtenido por el id lgobal');
    console.log(this.registroPorId); */
/*     this.route.paramMap.subscribe((params) => {
      let idGlobal = params.get('id');

      console.log('planning id: ', idGlobal);
    }); */
  }

  /* Método para generar un id para cada contrato agregado al arreglo de contratos del OCID */
  generarId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
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
/*   getMethodById(id: string): void {
    this.apiService.getMethod<any>(`/contracts/getById/${id}`).subscribe(
      (data: any) => {
        this.registroPorId = data;
        console.log('Datos obtenidos:', this.registroPorId.record);
      },
      (error: any) => {
        console.error('Error al obtener data:', error);
      }
    );
  } */

    getMethodById(id: string): void {
      this.apiService.getMethodById(id, '/contracts/getById').subscribe(
        (data: any) => {
          this.registroPorId = data;
          this.contractsArrayToSend = [...this.registroPorId.record.contracts];
          console.log('Datos obtenidos:', this.registroPorId);
        },
        (error: any) => {
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
    this.apiService.putMethod(this.idGlobal, dataToUpdate, '/contracts/update').subscribe(
      (data: any) => {
        console.log('Data updated successfully:', data);
        this.data2 = data;
        // Handle successful response (e.g., update UI)
      },
      (error: any) => {
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

  refillElemet(contratoId: string) {
    const contracts = this.registroPorId?.record?.contracts;
    if (!Array.isArray(contracts)) {
      console.error('contracts no es un array');
      return;
    }

    const contract = contracts.find(c => c.id === contratoId);
    if (!contract) {
      console.error('Contrato no encontrado');
      return;
    }
    console.log('contratoId: ', contratoId);
    this.contracts.patchValue({
      id: this.registroPorId.record.contracts.id,
      status: this.registroPorId.record.contracts.status,
      awardID: this.registroPorId.record.contracts.awardID,
      title: this.registroPorId.record.contracts.title,
      description: this.registroPorId.record.contracts.description,
      surveillanceMechanisms:
        this.registroPorId.record.contracts.surveillanceMechanisms,
      period: {
        startDate: this.registroPorId.record.contracts.period.startDate,
        endDate: this.registroPorId.record.contracts.period.endDate,
        durationInDays:
          this.registroPorId.record.contracts.period.durationInDays,
        maxExtentDate: this.registroPorId.record.contracts.period.maxExtentDate,
      },
      value: {
        amount: this.registroPorId.record.contracts.value.amount,
        amountNet: this.registroPorId.record.contracts.value.amountNet,
        currency: this.registroPorId.record.contracts.value.currency,
      },
      dateSignedContracts: {
        dateSigned:
          this.registroPorId.record.contracts.dateSignedContracts.dateSigned,
      },
    });
    this.items.patchValue({
      id: this.registroPorId.record.contracts.items.id,
      description: this.registroPorId.record.contracts.items.description,
      clasification: {
        scheme: this.registroPorId.record.contracts.items.clasification.scheme,
        id: this.registroPorId.record.contracts.items.clasification.id,
        uri: this.registroPorId.record.contracts.items.clasification.uri,
        description:
          this.registroPorId.record.contracts.items.clasification.description,
      },
      additionalClassifications: {
        scheme:
          this.registroPorId.record.contracts.items.additionalClassifications
            .scheme,
        id: this.registroPorId.record.contracts.items.additionalClassifications
          .id,
        uri: this.registroPorId.record.contracts.items.additionalClassifications
          .uri,
        description:
          this.registroPorId.record.contracts.items.additionalClassifications
            .description,
      },
      quantity: this.registroPorId.record.contracts.items.quantity,
      unit: {
        scheme: this.registroPorId.record.contracts.items.unit.scheme,
        id: this.registroPorId.record.contracts.items.unit.id,
        name: this.registroPorId.record.contracts.items.unit.name,
        uri: this.registroPorId.record.contracts.items.unit.uri,
        value: {
          amount: this.registroPorId.record.contracts.items.unit.value.amount,
          currency:
            this.registroPorId.record.contracts.items.unit.value.currency,
        },
      },
      deliveryLocation: {
        uri: this.registroPorId.record.contracts.items.deliveryLocation.uri,
        description:
          this.registroPorId.record.contracts.items.deliveryLocation
            .description,
        geometry: {
          type: this.registroPorId.record.contracts.items.deliveryLocation
            .geometry.type,
          coordinates: {
            latitude:
              this.registroPorId.record.contracts.items.deliveryLocation
                .geometry.coordinates.latitude,
            longitude:
              this.registroPorId.record.contracts.items.deliveryLocation
                .geometry.coordinates.longitude,
          },
          gazetteer: {
            scheme:
              this.registroPorId.record.contracts.items.deliveryLocation
                .geometry.gazetteer.scheme,
            identifiers:
              this.registroPorId.record.contracts.items.deliveryLocation
                .geometry.gazetteer.identifiers,
          },
        },
      },
      deliveryAddress: {
        uri: this.registroPorId.record.contracts.items.deliveryAddress.uri,
        description:
          this.registroPorId.record.contracts.items.deliveryAddress.description,
        streetAddress:
          this.registroPorId.record.contracts.items.deliveryAddress
            .streetAddress,
        locality:
          this.registroPorId.record.contracts.items.deliveryAddress.locality,
        region:
          this.registroPorId.record.contracts.items.deliveryAddress.region,
        postalCode:
          this.registroPorId.record.contracts.items.deliveryAddress.postalCode,
        countryName:
          this.registroPorId.record.contracts.items.deliveryAddress.countryName,
      },
    });
    this.guarantees.patchValue({
      id: this.registroPorId.record.contracts.guarantees.id,
      type: this.registroPorId.record.contracts.guarantees.type,
      date: this.registroPorId.record.contracts.guarantees.date,
      obligations: this.registroPorId.record.contracts.guarantees.obligations,
      value: {
        amount: this.registroPorId.record.contracts.guarantees.value.amount,
        currency: this.registroPorId.record.contracts.guarantees.value.currency,
      },
      guarantor: {
        id: this.registroPorId.record.contracts.guarantees.guarantor.id,
        name: this.registroPorId.record.contracts.guarantees.guarantor.name,
      },
      period: {
        startDate:
          this.registroPorId.record.contracts.guarantees.period.startDate,
        endDate: this.registroPorId.record.contracts.guarantees.period.endDate,
        durationInDays:
          this.registroPorId.record.contracts.guarantees.period.durationInDays,
        maxExtentDate:
          this.registroPorId.record.contracts.guarantees.period.maxExtentDate,
      },
    });
    this.documents.patchValue({
      id: this.registroPorId.record.contracts.documents.id,
      documentType: this.registroPorId.record.contracts.documents.documentType,
      title: this.registroPorId.record.contracts.documents.title,
      description: this.registroPorId.record.contracts.documents.description,
      uri: this.registroPorId.record.contracts.documents.uri,
      datePublished:
        this.registroPorId.record.contracts.documents.datePublished,
      dateModified: this.registroPorId.record.contracts.documents.dateModified,
      format: this.registroPorId.record.contracts.documents.format,
    });
    this.relatedProcesses.patchValue({
      id: this.registroPorId.record.contracts.relatedProcesses.id,
      relationship:
        this.registroPorId.record.contracts.relatedProcesses.relationship,
      title: this.registroPorId.record.contracts.relatedProcesses.title,
      scheme: this.registroPorId.record.contracts.relatedProcesses.scheme,
      identifier:
        this.registroPorId.record.contracts.relatedProcesses.identifier,
      uri: this.registroPorId.record.contracts.relatedProcesses.uri,
    });
    this.milestones.patchValue({
      id: this.registroPorId.record.contracts.milestones.id,
      title: this.registroPorId.record.contracts.milestones.title,
      type: this.registroPorId.record.contracts.milestones.type,
      description: this.registroPorId.record.contracts.milestones.description,
      code: this.registroPorId.record.contracts.milestones.code,
      dueDate: this.registroPorId.record.contracts.milestones.dueDate,
      dateMet: this.registroPorId.record.contracts.milestones.dateMet,
      dateModified: this.registroPorId.record.contracts.milestones.dateModified,
      status: this.registroPorId.record.contracts.milestones.status,
    });
    this.amendments.patchValue({
      id: this.registroPorId.record.contracts.amendments.id,
      date: this.registroPorId.record.contracts.amendments.date,
      rationale: this.registroPorId.record.contracts.amendments.rationale,
      description: this.registroPorId.record.contracts.amendments.description,
      amendsReleaseID:
        this.registroPorId.record.contracts.amendments.amendsReleaseID,
      releaseID: this.registroPorId.record.contracts.amendments.releaseID,
    });
    //console.log(this.registroPorId.record);
  }

  /* Funciones para el formulario */
  /* Editar */
/*   editElement(contract: any) {
    this.banderaEditar = true;
    this.contratoId = contract._id;
    this.isReadOnly = false;

    // Llenar el formulario principal
    this.contracts.patchValue({
      id: contract.id,
      status: contract.status,
      awardID: contract.awardID,
      title: contract.title,
      description: contract.description,
      surveillanceMechanisms: contract.surveillanceMechanisms,
      period: contract.period,
      value: contract.value,
      dateSignedContracts: contract.dateSignedContracts
    });

    // Llenar los subformularios
    this.items.patchValue(contract.items);
    this.guarantees.patchValue(contract.guarantees);
    this.documents.patchValue(contract.documents);
    this.relatedProcesses.patchValue(contract.relatedProcesses);
    this.milestones.patchValue(contract.milestones);
    this.amendments.patchValue(contract.amendments);

    console.log('Editando contrato:', contract);
  }
 */
  editElement(contract: any) {
    this.isReadOnly = false;
    this.banderaEditar = true;
    this.contratoId = contract._id;
    this.fillFormWithContractData(contract);
  }

  /* Visualizar */
  viewElement(contract: any) {
    this.isReadOnly = true;
    this.fillFormWithContractData(contract);
  }
  private fillFormWithContractData(contract: any) {
    this.contracts.patchValue({
      id: contract.id,
      status: contract.status,
      awardID: contract.awardID,
      title: contract.title,
      description: contract.description,
      surveillanceMechanisms: contract.surveillanceMechanisms,
      period: contract.period,
      value: contract.value,
      dateSignedContracts: contract.dateSignedContracts
    });

    this.items.patchValue(contract.items || {});
    this.guarantees.patchValue(contract.guarantees || {});
    this.documents.patchValue(contract.documents || {});
    this.relatedProcesses.patchValue(contract.relatedProcesses || {});
    this.milestones.patchValue(contract.milestones || {});
    this.amendments.patchValue(contract.amendments || {});

    // Desplazarse al formulario
    const element = document.getElementById('v-pills-contrato');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }

    // Activar la pestaña del formulario
    const tabElement = document.getElementById('v-pills-contrato-tab');
    if (tabElement) {
      tabElement.click();
    }
  }

  resetForm() {
    this.isReadOnly = false;
    this.banderaEditar = false;
    this.contratoId = '';
    this.contracts.reset();
    this.items.reset();
    this.guarantees.reset();
    this.documents.reset();
    this.relatedProcesses.reset();
    this.milestones.reset();
    this.amendments.reset();
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
    this.banderaEditar == false;
    console.log('Contrato agregado al array', this.contractsArrayToSend);
  }

/*   onSubmit(idGlobal: string, idArrayObject?: string) {
    if (this.banderaEditar === true && this.registroPorId) {
      alert('editar:' + this.contratoId);
      this.resetForm();
      this.getMethodById(this.idGlobal);
      console.log(this.registroPorId.record.contracts);
      //let array = [1, 2, 3, 4, 5];
      let array = this.registroPorId.record.contracts;
      for (let i = 0; i < array.length; i++) {
        console.log('desde la version de editar contrato');
        console.log(array[i]);
        if (array[i]._id == this.contratoId) {
          //console.log("arreglo: ");
          //console.log(array[i]);
          this.addElementToObject();
          console.log('nuevo arreglo');
          let _id = array[i]._id;
          console.log(_id);
          console.log('nuevo objeto en el array');
          console.log(this.contracts);
          //array[i] = this.contracts;
          //array[i]._id = _id;
        }
        //console.log("encontrado: ", array[i]);
      }
    } else {
      alert('agregar');
      let encontrado = false; // Esta variable no se usa
      this.addElementToObject();
      this.dataToUpdate = {
        id: this.idGlobal,
        data: {
          ...this.registroPorId.record.contracts,
          contracts: this.contractsArrayToSend,
        },
      };

      if (this.registroPorId.record) {
        this.putMethod(this.dataToUpdate);
        this.resetForm();
        this.getMethodById(this.idGlobal);
      } else {
        console.log('No se encontró el registro');
        alert('No se encontró el registro, intente más tarde');
      }
    }
  } */

    onSubmit(idGlobal: string) {
      
      if (this.banderaEditar) {
        // Encontrar el índice del contrato a actualizar
        const index = this.contractsArrayToSend.findIndex(c => c._id === this.contratoId);
        if (index !== -1) {
          // Actualizar el contrato existente
          this.contractsArrayToSend[index] = {
            ...this.contractsArrayToSend[index],
            ...this.contracts.value,
            items: this.items.value,
            guarantees: this.guarantees.value,
            documents: this.documents.value,
            relatedProcesses: this.relatedProcesses.value,
            milestones: this.milestones.value,
            amendments: this.amendments.value
          };
        }
      } else {
        // Agregar un nuevo contrato
        this.addElementToObject();
        this.contractsArrayToSend.push(this.datacontract);
      }

      // Preparar datos para enviar al API
      this.dataToUpdate = {
        id: idGlobal,
        data: {
          contracts: this.contractsArrayToSend
        }
      };

      // Enviar datos al API
      this.putMethod(this.dataToUpdate);

      // Resetear el formulario y obtener datos actualizados
      this.resetForm();
      this.getMethodById(idGlobal);

      // Resetear la bandera de edición
      this.banderaEditar = false;
      this.contratoId = '';
    }
/*     onSubmit(idGlobal: string) {
      if (this.banderaEditar) {
        // Crear un nuevo objeto con los datos actualizados
        let updatedContract = {
          _id: this.contratoId,
          ...this.contracts.value,
          items: this.items.value,
          guarantees: this.guarantees.value,
          documents: this.documents.value,
          relatedProcesses: this.relatedProcesses.value,
          milestones: this.milestones.value,
          amendments: this.amendments.value
        };

        // Encontrar el índice del contrato a actualizar
        let index = this.contractsArrayToSend.findIndex(c => c._id === this.contratoId);

        if (index !== -1) {
          // Actualizar el contrato en el array
          this.contractsArrayToSend[index] = updatedContract;
        } else {
          console.error('No se encontró el contrato para editar');
          return;
        }
      } else {
        // Si no se está editando, agregar un nuevo contrato
        this.addElementToObject();
        this.contractsArrayToSend.push(this.datacontract);
      }

      // Preparar datos para enviar al API
      this.dataToUpdate = {
        id: this.idGlobal,
        data: {
          contracts: this.contractsArrayToSend
        }
      };

      // Enviar datos al API
      this.putMethod(this.dataToUpdate);

      // Resetear el formulario y obtener datos actualizados
      this.resetForm();
      this.getMethodById(this.idGlobal);

      // Resetear la bandera de edición
      this.banderaEditar = false;
      this.contratoId = '';
    } */

    }
