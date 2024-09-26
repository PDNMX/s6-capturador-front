import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.css'],
})
export class AwardsComponent implements OnInit {
awardForm!: FormGroup;


  data: any;
  data1: any;
  savingMessage: string = '';
  isSaving: boolean = false;
  recordId: string = '';

  //Almacenar los datos temporalmente para cada sección

  tempAwards: any = {
    suppliers: [],
    items: [],
    documents: [],
    amendments: [],
  };

  awards: FormGroup = new FormGroup({});
  suppliers: FormGroup = new FormGroup({});
  items: FormGroup = new FormGroup({});
  documents: FormGroup = new FormGroup({});
  amendments: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private apiService: ApiService) {}
  ngOnInit(): void {
    //this.getMethod();
    this.loadRecordId();
    this.initForms();
    if (this.recordId) {
      this.loadExistingData();
    }
  }

  loadRecordId() {
    const storedId = localStorage.getItem('record');
    if (storedId) {
      this.recordId = storedId;
    } else {
      console.error('No se encontró el ID del registro');
    }
  }

  loadExistingData() {
    const body = { id: this.recordId };
    this.apiService.postMethod(body, `/awards/getById`).subscribe(
      (response: any) => {
        if (response && response.record && response.record.award) {
          const awardData = response.record.award;
          this.populateForm(awardData);
        } else {
          console.error('Los datos recibidos no tienen la estructura esperada');
        }
      },
      (error) => {
        console.error('Error al cargar los datos:', error);
      }
    );
  }

  populateForm(data: any) {
    console.log('Datos recibidos:', data);
    // Poblar el formulario principal
    this.awards.patchValue({
      id: data.id,
      status: data.status,
      title: data.title,
      description: data.description,
      rationale: data.rationale,
      date: data.date,
      value: data.value,
      contractPeriod: data.contractPeriod,
    });

    // Poblar los arrays
    this.tempAwards.suppliers = data.suppliers || [];
    this.tempAwards.items = data.items || [];
    this.tempAwards.documents = data.documents || [];
    this.tempAwards.amendments = data.amendments || [];
  }

  //Para ser usado con el api del s6
  /*  postMethod(dataToSend: any) {
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
  } */

  // Método para ser usado con el api del s6
  /*   getMethod(): void {
    this.apiService.getMethod('/get').subscribe(
      (data) => {
        this.data = data;
        console.log('data recibida por la funcion', data);
      },
      (error) => console.error('Error fetching data:', error)
    );
  } */
  /* Mostrar en consolo el contenido de los formularios */
  initForms() {

    this.awardForm = this.fb.group({
      suppliers: this.fb.array([], Validators.required),
    })
    
      

    this.documents = this.fb.group({
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

    this.amendments = this.fb.group({
      date: ['', Validators.required],
      rationale: ['', Validators.required],
      id: ['', Validators.required],
      description: ['', Validators.required],
      amendsReleaseID: ['', Validators.required],
      releaseID: ['', Validators.required],
    });
  }

  get suppliersArray() {
    return this.awardForm.controls['suppliers'] as FormArray;
    //return this.awardForm.get('suppliers') as FormArray;
  }

  addSupplier(opt: any): void {
    this.suppliersArray.push(this.fb.group({ ...opt }));
    /* const suppliersArray = this.awardForm.get('suppliers') as FormArray;
    suppliersArray.push(this.fb.group(newSupplier)); */
  }

  deleteSupplier(index: number): void {
    this.suppliersArray.removeAt(index);
   /*  const suppliersArray = this.awardForm.get('suppliers') as FormArray;
    suppliersArray.removeAt(index); */
  }

  saveGeneralDataForm(data: any): void {
    this.awardForm = this.fb.group({
      ...this.awardForm.controls,
      ...data,
    });
  }

  onSubmit() {
    console.log(this.awards.value);
    this.tempAwards = { ...this.tempAwards, ...this.awards.value };
    this.showSavingMessage();
    //this.awards.reset();
  }


  onSubmitItems() {
    console.log(this.items.value);
    this.tempAwards.items.push(this.items.value);
    this.showSavingMessage();
    //this.items.reset();
  }

  onSubmitDocuments() {
    console.log(this.documents.value);
    this.tempAwards.documents.push(this.documents.value);
    this.showSavingMessage();
    //this.documents.reset();
  }

  onSubmitAwardsAmendments() {
    console.log(this.amendments.value);
    this.tempAwards.amendments.push(this.amendments.value);
    this.showSavingMessage();
    //this.documents.reset();
  }

  //Metodo del mensaje guardando
  showSavingMessage() {
    this.isSaving = true;
    this.savingMessage = 'Guardando...';
    setTimeout(() => {
      this.isSaving = false;
      this.savingMessage = '';
    }, 1500);
  }

  submitAllSections() {
    const awardData = {
      ...this.awards.value,
      suppliers: this.tempAwards.suppliers,
      items: this.tempAwards.items,
      documents: this.tempAwards.documents,
      amendments: this.tempAwards.amendments,
    };
    // Guarda la información del formulario en una varialbe y se lo pasamos a los metodos insert o update
    const finalData = {
      id: this.recordId,
      data: {
        award: awardData,
      },
    };

    if (this.recordId) {
      // Actualizar
      this.apiService
        .putMethod(this.recordId, finalData, '/awards/update')
        .subscribe(
          (response: any) => {
            console.log('Actualización exitosa:', response);
            this.savingMessage = 'Datos actualizados con éxito';
            this.isSaving = false;
          },
          (error) => {
            console.error('Error en la actualización:', error);
            this.savingMessage = 'Error al actualizar los datos';
            this.isSaving = false;
          }
        );
    } else {
      // Insertar
      this.apiService.postMethod(finalData, '/awards/insert').subscribe(
        (response: any) => {
          console.log('Inserción exitosa:', response);
          this.savingMessage = 'Datos insertados con éxito';
          this.isSaving = false;
          this.recordId = response.id; // Asumiendo que la respuesta incluye el nuevo ID
          localStorage.setItem('record', this.recordId);
        },
        (error) => {
          console.error('Error en la inserción:', error);
          this.savingMessage = 'Error al insertar los datos';
          this.isSaving = false;
        }
      );
    }
  }
}
