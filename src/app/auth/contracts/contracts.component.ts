import { Component, OnInit } from '@angular/core';
import { FormArray, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { group } from '@angular/animations';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css'],
})
export class ContractsComponent implements OnInit {
  record_id = null;
  contractsForm!: FormGroup;
  contractForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

  get contractsArray() {
    return this.contractsForm.controls['contracts'] as FormArray;
  }

  addContract(): void {
    this.contractsArray.push(this.contractForm);
  }

  deleteContract(index: number): void {
    this.contractsArray.removeAt(index);
  }

  get guaranteesArray() {
    return this.contractForm.controls['guarantees'] as FormArray;
  }

  addGuarante(opt: any): void {
    this.guaranteesArray.push(opt);
  }
  deleteGuarante(index: number): void {
    this.guaranteesArray.removeAt(index);
  }

  get documentsArray() {
    return this.contractForm.controls['documents'] as FormArray;
  }

  addDocument(opt: any): void {
    this.documentsArray.push(opt);
  }
  deleteDocuments(index: number): void {
    this.documentsArray.removeAt(index);
  }

  get milestonesArray() {
    return this.contractForm.controls['milestones'] as FormArray;
  }

  addMileston(opt: any): void {
    this.milestonesArray.push(opt);
  }
  deleteMileston(index: number): void {
    this.milestonesArray.removeAt(index);
  }

  get amendmentsArray() {
    return this.contractForm.controls['amendments'] as FormArray;
  }

  addAmendments(opt: any): void {
    this.amendmentsArray.push(opt);
  }
  deleteAmendments(index: number): void {
    this.amendmentsArray.removeAt(index);
  }

  get itemsArray() {
    return this.contractForm.controls['items'] as FormArray;
  }

  addItems(opt: any): void {
    this.itemsArray.push(opt);
  }
  deleteItems(index: number): void {
    this.itemsArray.removeAt(index);
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
    });

    this.initForm();
    this.initContractForm();
  }

  initForm(): void {
    this.contractsForm = this.fb.group({
      contracts: this.fb.array([{ id: 'num' }]),
    });
  }

  initContractForm(): void {
    this.contractForm = this.fb.group({
      id: ['id', [Validators.required]],
      awardID: ['awardID', [Validators.required]],
      title: ['title', [Validators.required]],
      description: ['description', [Validators.required]],
      status: ['pending', [Validators.required]],
      period: this.fb.group({
        startDate: ['startDate', [Validators.required]],
        endDate: ['endDate', [Validators.required]],
        maxExtentDate: ['maxExtentDate', [Validators.required]],
        durationInDays: ['durationInDays', [Validators.required]],
      }),
      value: this.fb.group({
        amount: [0, [Validators.required]],
        amountNet: [0, [Validators.required]],
        currency: ['MXN', [Validators.required]],
        exchangeRates: this.fb.array([]),
      }),
      dateSigned: ['dateSigned', [Validators.required]],
      surveillanceMechanisms: this.fb.array([]),
      items: this.fb.array([]),
      guarantees: this.fb.array([]),
      documents: this.fb.array([]),
      milestones: this.fb.array([]),
      amendments: this.fb.array([]),
    });
  }

  // fin del codigo

  /* Arreglos que contienen los arreglos anidados de cada sección */
  // itemsArray: any[] = [];
  // guaranteesArray: any[] = [];
  // documentsArray: any[] = [];
  relatedProcessesArray: any[] = [];
  // milestonesArray: any[] = [];
  // amendmentsArray: any[] = [];
  /* Variable que sirve para identificar si los botones deben ser visibles o no */
  mostrarBotones: boolean = false;
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

  /* Comienza seccion de contracts de datos generales */
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
      exchangeRate: this.fb.array([]),
    }),
    dateSignedContracts: this.fb.group({
      dateSigned: ['', Validators.required],
    }),
  });

  // Método para agregar un nuevo exchangeRate
  addExchangeRate() {
    const exchangeRateForm = this.fb.group({
      rate: ['', Validators.required],
      currency: ['', Validators.required],
      date: ['', Validators.required],
      source: ['', Validators.required],
    });
    (this.contracts.get('value.exchangeRate') as FormArray).push(
      exchangeRateForm
    );
  }

  // Getter para acceder fácilmente al FormArray de exchangeRate
  get exchangeRates() {
    return this.contracts.get('value.exchangeRate') as FormArray;
  }

  removeExchangeRate(index: number) {
    (this.contracts.get('value.exchangeRate') as FormArray).removeAt(index);
  }

  /* Agregar contrato al array de contratos */
  addContracttoArraycontracts() {
    //alert('Contrato agregado al array...');
    this.addElementToObject();
    this.contractsArrayToSend.push(this.datacontract);
    this.resetForm();
    this.banderaEditar == false;
    console.log('Contrato agregado al array', this.contractsArrayToSend);
  }

  /* Termina seccion de contracts de datos generales */

  /********************** Métodos para llamar al api desde el servicio *******************/
  getMethod(): void {
    this.apiService.getMethod('/contracts/query').subscribe(
      (response: any) => {
        this.data1 = response;
      },
      (error) => console.error('Error fetching data:', error)
    );
  }

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

  /******************** Comienza la seccion de métodos para llamar el servicio y actualizar *******************/
  putMethod(dataToUpdate: any) {
    this.apiService
      .putMethod(this.idGlobal, dataToUpdate, '/contracts/update')
      .subscribe(
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
  /******************* Termina la sección de métodos para llamar al api desde el servicio *******************/

  /********************  Comienza la sección de documentos ********************/

  // documents = this.fb.group({
  //   id: ['', Validators.required],
  //   documentType: ['', Validators.required],
  //   title: ['', Validators.required],
  //   description: ['', Validators.required],
  //   uri: ['', Validators.required],
  //   datePublished: ['', Validators.required],
  //   dateModified: ['', Validators.required],
  //   format: ['', Validators.required],
  //   language: ['', Validators.required],
  // });

  // addDocumentToArray() {
  //   const newDocument = this.documents.value;
  //   this.documentsArray.push(newDocument);
  //   this.documents.reset();
  // }

  // deleteDocument(index: number) {
  //   this.documentsArray.splice(index, 1);
  // }

  // //para agregar contenido al arreglo
  // addDocumentsToArray() {
  //   this.datacontract = {
  //     ...this.datacontract,
  //     documents: this.documentsArray,
  //   };
  // }

  /********************  Terminma la sección de documentos ********************/

  /******************* Comienza la sección de items ********************/
  // items = this.fb.group({
  //   id: ['', Validators.required],
  //   description: ['', Validators.required],
  //   clasification: this.fb.group({
  //     scheme: ['', Validators.required],
  //     id: ['', Validators.required],
  //     uri: ['', Validators.required],
  //     description: ['', Validators.required],
  //   }),
  //   additionalClassifications: this.fb.group({
  //     scheme: ['', Validators.required],
  //     id: ['', Validators.required],
  //     uri: ['', Validators.required],
  //     description: ['', Validators.required],
  //   }),
  //   quantity: ['', Validators.required],
  //   unit: this.fb.group({
  //     scheme: ['', Validators.required],
  //     id: ['', Validators.required],
  //     name: ['', Validators.required],
  //     uri: ['', Validators.required],
  //     value: this.fb.group({
  //       amount: ['', Validators.required],
  //       currency: ['', Validators.required],
  //     }),
  //   }),
  //   deliveryLocation: this.fb.group({
  //     uri: ['', Validators.required],
  //     description: ['', Validators.required],
  //     geometry: this.fb.group({
  //       type: ['', Validators.required],
  //       coordinates: this.fb.group({
  //         latitude: ['', Validators.required],
  //         longitude: ['', Validators.required],
  //       }),
  //       gazetteer: this.fb.group({
  //         scheme: ['', Validators.required],
  //         identifiers: ['', Validators.required],
  //       }),
  //     }),
  //   }),
  //   deliveryAddress: this.fb.group({
  //     uri: ['', Validators.required],
  //     description: ['', Validators.required],
  //     streetAddress: ['', Validators.required],
  //     locality: ['', Validators.required],
  //     region: ['', Validators.required],
  //     postalCode: ['', Validators.required],
  //     countryName: ['', Validators.required],
  //   }),
  // });

  // addItemToArray() {
  //   const newItem = this.items.value;
  //   this.itemsArray.push(newItem);
  //   this.items.reset(); // Clear the form after adding
  // }

  // deleteItem(index: number) {
  //   this.itemsArray.splice(index, 1);
  // }

  // addItemsToArray() {
  //   console.log('Agregando items al array');
  //   this.datacontract = {
  //     ...this.datacontract,
  //     items: this.itemsArray,
  //   };
  //   console.log('Ítems agregados al array', this.datacontract);
  // }

  /******************** Termina la sección de items ********************/

  /******************* Comienza la sección de garantías *******************/
  // guarantees = this.fb.group({
  //   id: ['', Validators.required],
  //   type: ['', Validators.required],
  //   date: ['', Validators.required],
  //   obligations: ['', Validators.required],
  //   value: this.fb.group({
  //     amount: ['', Validators.required],
  //     currency: ['', Validators.required],
  //   }),
  //   guarantor: this.fb.group({
  //     id: ['', Validators.required],
  //     name: ['', Validators.required],
  //   }),
  //   period: this.fb.group({
  //     startDate: ['', Validators.required],
  //     endDate: ['', Validators.required],
  //     durationInDays: ['', Validators.required],
  //     maxExtentDate: ['', Validators.required],
  //   }),
  // });

  // addGuaranteeToArray() {
  //   const newGuarantee = this.guarantees.value;
  //   this.guaranteesArray.push(newGuarantee);
  //   this.guarantees.reset(); // Clear the form after adding
  // }

  // deleteGuarantee(index: number) {
  //   this.guaranteesArray.splice(index, 1);
  // }

  // addGuaranteesToArray() {
  //   console.log('Agregando garantías al array');
  //   this.datacontract = {
  //     ...this.datacontract,
  //     guarantees: this.guaranteesArray,
  //   };
  //   console.log('Garantías agregadas al array', this.datacontract);
  // }

  /******************* Termina la sección de garantías *******************/

  /******************* Comienza la sección de procesos relacionados *******************/

  relatedProcesses = this.fb.group({
    id: ['', Validators.required],
    relationship: ['', Validators.required],
    title: ['', Validators.required],
    scheme: ['', Validators.required],
    identifier: ['', Validators.required],
    uri: ['', Validators.required],
  });

  addRelatedProcessToArray() {
    const newRelatedProcess = this.relatedProcesses.value;
    this.relatedProcessesArray.push(newRelatedProcess);
    this.relatedProcesses.reset();
  }

  deleteRelatedProcess(index: number) {
    this.relatedProcessesArray.splice(index, 1);
  }

  addRelatedProcessesToArray() {
    this.datacontract = {
      ...this.datacontract,
      relatedProcesses: this.relatedProcessesArray,
    };
  }

  /******************* Termina la sección de procesos relacionados *******************/

  /******************* Comienza la sección de hitos *******************/
  // milestones = this.fb.group({
  //   id: ['', Validators.required],
  //   title: ['', Validators.required],
  //   type: ['', Validators.required],
  //   description: ['', Validators.required],
  //   code: ['', Validators.required],
  //   dueDate: ['', Validators.required],
  //   dateMet: ['', Validators.required],
  //   dateModified: ['', Validators.required],
  //   status: ['', Validators.required],
  // });

  // addMilestoneToArray() {
  //   const newMilestone = this.milestones.value;
  //   this.milestonesArray.push(newMilestone);
  //   this.milestones.reset();
  // }

  // deleteMilestone(index: number) {
  //   this.milestonesArray.splice(index, 1);
  // }

  // addMilestonesToArray() {
  //   this.datacontract = {
  //     ...this.datacontract,
  //     milestones: this.milestonesArray,
  //   };
  // }

  /******************* Termina la sección de hitos *******************/

  /******************* Comienza la sección de modificaciones *******************/
  // amendments = this.fb.group({
  //   id: ['', Validators.required],
  //   date: ['', Validators.required],
  //   rationale: ['', Validators.required],
  //   description: ['', Validators.required],
  //   amendsReleaseID: ['', Validators.required],
  //   releaseID: ['', Validators.required],
  // });

  // addAmendmentToArray() {
  //   const newAmendment = this.amendments.value;
  //   this.amendmentsArray.push(newAmendment);
  //   this.amendments.reset();
  // }

  // deleteAmendment(index: number) {
  //   this.amendmentsArray.splice(index, 1);
  // }

  // addAmendmentsToArray() {
  //   this.datacontract = {
  //     ...this.datacontract,
  //     amendments: this.amendmentsArray,
  //   };
  // }

  /******************* Termina la sección de modificaciones *******************/

  /******************* Comienza la sección de funciones generales *********************/

  /* Función implementada unicamente para desarrollo, el objeto se construye por sección */
  addElementToObject() {
    //alert('Elemento agregado');
    let contractSend = this.contracts.value;
    // let items = this.items.value;
    // let guarantees = this.guarantees.value;
    // let documents = this.documents.value;
    let relatedProcesses = this.relatedProcesses.value;
    // let milestones = this.milestones.value;
    // let amendments = this.amendments.value;

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
      // items: {
      //   id: items.id,
      //   description: items.description,
      //   clasification: items.clasification,
      //   additionalClassifications: items.additionalClassifications,
      //   quantity: items.quantity,
      //   unit: items.unit,
      //   deliveryLocation: items.deliveryLocation,
      //   deliveryAddress: items.deliveryAddress,
      // },
      // guarantees: {
      //   id: guarantees.id,
      //   type: guarantees.type,
      //   date: guarantees.date,
      //   obligations: guarantees.obligations,
      //   value: guarantees.value,
      //   guarantor: guarantees.guarantor,
      //   period: guarantees.period,
      // },
      // documents: {
      //   id: documents.id,
      //   documentType: documents.documentType,
      //   title: documents.title,
      //   description: documents.description,
      //   uri: documents.uri,
      //   datePublished: documents.datePublished,
      //   dateModified: documents.dateModified,
      //   format: documents.format,
      // },
      relatedProcesses: {
        id: relatedProcesses.id,
        relationship: relatedProcesses.relationship,
        title: relatedProcesses.title,
        scheme: relatedProcesses.scheme,
        identifier: relatedProcesses.identifier,
        uri: relatedProcesses.uri,
      },
      // milestones: {
      //   id: milestones.id,
      //   title: milestones.title,
      //   type: milestones.type,
      //   description: milestones.description,
      //   code: milestones.code,
      //   dueDate: milestones.dueDate,
      //   dateMet: milestones.dateMet,
      //   dateModified: milestones.dateModified,
      //   status: milestones.status,
      // },
      // amendments: {
      //   id: amendments.id,
      //   date: amendments.date,
      //   rationale: amendments.rationale,
      //   description: amendments.description,
      //   amendsReleaseID: amendments.amendsReleaseID,
      //   releaseID: amendments.releaseID,
      // },
    };
  }

  /* Quitar valores capturados de los input(formbuilder) */

  refillElemet(contratoId: string) {
    const contracts = this.registroPorId?.record?.contracts;
    if (!Array.isArray(contracts)) {
      console.error('contracts no es un array');
      return;
    }

    const contract = contracts.find((c) => c.id === contratoId);
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
    // this.items.patchValue({
    //   id: this.registroPorId.record.contracts.items.id,
    //   description: this.registroPorId.record.contracts.items.description,
    //   clasification: {
    //     scheme: this.registroPorId.record.contracts.items.clasification.scheme,
    //     id: this.registroPorId.record.contracts.items.clasification.id,
    //     uri: this.registroPorId.record.contracts.items.clasification.uri,
    //     description:
    //       this.registroPorId.record.contracts.items.clasification.description,
    //   },
    //   additionalClassifications: {
    //     scheme:
    //       this.registroPorId.record.contracts.items.additionalClassifications
    //         .scheme,
    //     id: this.registroPorId.record.contracts.items.additionalClassifications
    //       .id,
    //     uri: this.registroPorId.record.contracts.items.additionalClassifications
    //       .uri,
    //     description:
    //       this.registroPorId.record.contracts.items.additionalClassifications
    //         .description,
    //   },
    //   quantity: this.registroPorId.record.contracts.items.quantity,
    //   unit: {
    //     scheme: this.registroPorId.record.contracts.items.unit.scheme,
    //     id: this.registroPorId.record.contracts.items.unit.id,
    //     name: this.registroPorId.record.contracts.items.unit.name,
    //     uri: this.registroPorId.record.contracts.items.unit.uri,
    //     value: {
    //       amount: this.registroPorId.record.contracts.items.unit.value.amount,
    //       currency:
    //         this.registroPorId.record.contracts.items.unit.value.currency,
    //     },
    //   },
    //   deliveryLocation: {
    //     uri: this.registroPorId.record.contracts.items.deliveryLocation.uri,
    //     description:
    //       this.registroPorId.record.contracts.items.deliveryLocation
    //         .description,
    //     geometry: {
    //       type: this.registroPorId.record.contracts.items.deliveryLocation
    //         .geometry.type,
    //       coordinates: {
    //         latitude:
    //           this.registroPorId.record.contracts.items.deliveryLocation
    //             .geometry.coordinates.latitude,
    //         longitude:
    //           this.registroPorId.record.contracts.items.deliveryLocation
    //             .geometry.coordinates.longitude,
    //       },
    //       gazetteer: {
    //         scheme:
    //           this.registroPorId.record.contracts.items.deliveryLocation
    //             .geometry.gazetteer.scheme,
    //         identifiers:
    //           this.registroPorId.record.contracts.items.deliveryLocation
    //             .geometry.gazetteer.identifiers,
    //       },
    //     },
    //   },
    //   deliveryAddress: {
    //     uri: this.registroPorId.record.contracts.items.deliveryAddress.uri,
    //     description:
    //       this.registroPorId.record.contracts.items.deliveryAddress.description,
    //     streetAddress:
    //       this.registroPorId.record.contracts.items.deliveryAddress
    //         .streetAddress,
    //     locality:
    //       this.registroPorId.record.contracts.items.deliveryAddress.locality,
    //     region:
    //       this.registroPorId.record.contracts.items.deliveryAddress.region,
    //     postalCode:
    //       this.registroPorId.record.contracts.items.deliveryAddress.postalCode,
    //     countryName:
    //       this.registroPorId.record.contracts.items.deliveryAddress.countryName,
    //   },
    // });
    // this.guarantees.patchValue({
    //   id: this.registroPorId.record.contracts.guarantees.id,
    //   type: this.registroPorId.record.contracts.guarantees.type,
    //   date: this.registroPorId.record.contracts.guarantees.date,
    //   obligations: this.registroPorId.record.contracts.guarantees.obligations,
    //   value: {
    //     amount: this.registroPorId.record.contracts.guarantees.value.amount,
    //     currency: this.registroPorId.record.contracts.guarantees.value.currency,
    //   },
    //   guarantor: {
    //     id: this.registroPorId.record.contracts.guarantees.guarantor.id,
    //     name: this.registroPorId.record.contracts.guarantees.guarantor.name,
    //   },
    //   period: {
    //     startDate:
    //       this.registroPorId.record.contracts.guarantees.period.startDate,
    //     endDate: this.registroPorId.record.contracts.guarantees.period.endDate,
    //     durationInDays:
    //       this.registroPorId.record.contracts.guarantees.period.durationInDays,
    //     maxExtentDate:
    //       this.registroPorId.record.contracts.guarantees.period.maxExtentDate,
    //   },
    // });
    // this.documents.patchValue({
    //   id: this.registroPorId.record.contracts.documents.id,
    //   documentType: this.registroPorId.record.contracts.documents.documentType,
    //   title: this.registroPorId.record.contracts.documents.title,
    //   description: this.registroPorId.record.contracts.documents.description,
    //   uri: this.registroPorId.record.contracts.documents.uri,
    //   datePublished:
    //     this.registroPorId.record.contracts.documents.datePublished,
    //   dateModified: this.registroPorId.record.contracts.documents.dateModified,
    //   format: this.registroPorId.record.contracts.documents.format,
    // });
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
    // this.milestones.patchValue({
    //   id: this.registroPorId.record.contracts.milestones.id,
    //   title: this.registroPorId.record.contracts.milestones.title,
    //   type: this.registroPorId.record.contracts.milestones.type,
    //   description: this.registroPorId.record.contracts.milestones.description,
    //   code: this.registroPorId.record.contracts.milestones.code,
    //   dueDate: this.registroPorId.record.contracts.milestones.dueDate,
    //   dateMet: this.registroPorId.record.contracts.milestones.dateMet,
    //   dateModified: this.registroPorId.record.contracts.milestones.dateModified,
    //   status: this.registroPorId.record.contracts.milestones.status,
    // });
    // this.amendments.patchValue({
    //   id: this.registroPorId.record.contracts.amendments.id,
    //   date: this.registroPorId.record.contracts.amendments.date,
    //   rationale: this.registroPorId.record.contracts.amendments.rationale,
    //   description: this.registroPorId.record.contracts.amendments.description,
    //   amendsReleaseID:
    //     this.registroPorId.record.contracts.amendments.amendsReleaseID,
    //   releaseID: this.registroPorId.record.contracts.amendments.releaseID,
    // });
    //console.log(this.registroPorId.record);
  }

  /* Método para generar un id para cada contrato agregado al arreglo de contratos del OCID */

  newContract(): void {
    this.mostrarBotones = true;
  }

  generarId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  editElement(contract: any) {
    this.isReadOnly = false;
    this.banderaEditar = true;
    this.contratoId = contract._id;
    this.fillFormWithContractData(contract);
    this.mostrarBotones = true;
  }

  /* Visualizar */
  viewElement(contract: any) {
    this.isReadOnly = true;
    this.fillFormWithContractData(contract);
    this.mostrarBotones = true;
  }

  deleteElement(contract: any) {
    this.isReadOnly = false;
    this.banderaEditar = false;
    this.contratoId = contract._id;
    this.deleteContractFromArray(contract._id);
    this.dataToUpdate = {
      id: this.idGlobal,
      data: {
        contracts: this.contractsArrayToSend,
      },
    };
    this.putMethod(this.dataToUpdate);
    this.resetForm();
    this.getMethodById(this.idGlobal);
    alert('Contrato eliminado exitosamente');
  }

  deleteContractFromArray(contractId: string) {
    // Encontrar el índice del contrato a eliminar
    const index = this.contractsArrayToSend.findIndex(
      (c) => c._id === contractId
    );
    if (index !== -1) {
      // Eliminar el contrato
      this.contractsArrayToSend.splice(index, 1);
    }
    console.log('Contratos actualizados:', this.contractsArrayToSend);
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
      dateSignedContracts: contract.dateSignedContracts,
    });

    // this.itemsArray = contract.items || [];
    // this.guaranteesArray = contract.guarantees || [];
    // this.documentsArray = contract.documents || [];
    this.relatedProcessesArray = contract.relatedProcesses || [];
    // this.milestonesArray = contract.milestones || [];
    // this.amendmentsArray = contract.amendments || [];

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
    // this.itemsArray = [];
    // this.guaranteesArray = [];
    // this.documentsArray = [];
    this.relatedProcessesArray = [];
    // this.milestonesArray = [];
    // this.amendmentsArray = [];
  }

  onSubmit(idGlobal: string) {
    console.log('idGlobal: ', idGlobal);
    console.log('this.contractForm.value: ', this.contractForm.value);
  }

  onSubmit2(idGlobal: string) {
    if (this.banderaEditar) {
      this.getMethodById(this.idGlobal);
      // Encontrar el índice del contrato a actualizar
      const index = this.contractsArrayToSend.findIndex(
        (c) => c._id === this.contratoId
      );
      if (index !== -1) {
        // Actualizar el contrato existente
        this.contractsArrayToSend[index] = {
          ...this.contractsArrayToSend[index],
          ...this.contracts.value,
          items: this.itemsArray,
          // guarantees: this.guaranteesArray,
          // documents: this.documentsArray,
          relatedProcesses: this.relatedProcessesArray,
          // milestones: this.milestonesArray,
          // amendments: this.amendmentsArray,
        };
      }
    } else {
      // Agregar un nuevo contrato
      this.addElementToObject();
      this.datacontract.items = this.itemsArray;
      // this.datacontract.guarantees = this.guaranteesArray;
      // this.datacontract.documents = this.documentsArray;
      this.datacontract.relatedProcesses = this.relatedProcessesArray;
      // this.datacontract.milestones = this.milestonesArray;
      // this.datacontract.amendments = this.amendmentsArray;
      this.datacontract.implementation = {};
      this.contractsArrayToSend.push(this.datacontract);
    }

    // Preparar datos para enviar al API
    this.dataToUpdate = {
      id: idGlobal,
      data: {
        contracts: this.contractsArrayToSend,
      },
    };

    // Enviar datos al API
    this.putMethod(this.dataToUpdate);

    // Resetear el formulario y obtener datos actualizados
    this.resetForm();
    this.getMethodById(idGlobal);

    // Resetear la bandera de edición
    this.banderaEditar = false;
    this.contratoId = '';
    this.mostrarBotones = false;
  }
  /********************* Termina la sección de funciones generales *********************/
}
