import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.css'],
})
export class AwardsComponent implements OnInit {
  awardForm!: FormGroup;
  record_id = null;

  isSaving: boolean = false;
  savingMessage: string = '';
  /*   data: any;
  data1: any;
  savingMessage: string = '';
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
  amendments: FormGroup = new FormGroup({}); */

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute
  ) {}

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

  get itemsArray() {
    return this.awardForm.controls['items'] as FormArray;
  }

  addItem(opt: any): void {
    this.itemsArray.push(opt);
  }

  deleteItem(index: number): void {
    this.itemsArray.removeAt(index);
  }

  get documentsarray() {
    return this.awardForm.controls['documents'] as FormArray;
  }

  addDocument(opt: any): void {
    this.documentsarray.push(opt);
  }

  deleteDocument(index: number): void {
    this.documentsarray.removeAt(index);
  }

  get amendmentsarray() {
    return this.awardForm.controls['amendments'] as FormArray;
  }

  addAmendment(opt: any): void {
    this.amendmentsarray.push(opt);
  }

  deleteAmendment(index: number): void {
    this.amendmentsarray.removeAt(index);
  }

  /*   loadRecordId() {
    const storedId = localStorage.getItem('record');
    if (storedId) {
      this.recordId = storedId;
    } else {
      console.error('No se encontró el ID del registro');
    }
  } */

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
  ngOnInit(): void {
    //this.getMethod();
    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
      //this.loadExistingData();

      this.awardForm = this.fb.group({
        suppliers: this.fb.array([], [Validators.required]),
        items: this.fb.array([], [Validators.required]),
        documents: this.fb.array([], [Validators.required]),
        amendments: this.fb.array([], [Validators.required]),
      });
    });
  }

  //Metodo del mensaje guardando
  showSavingMessage() {
    this.isSaving = true;
    this.savingMessage = 'Guardando adjudicación...';
    setTimeout(() => {
      this.isSaving = false;
      this.savingMessage = '';
    }, 2000);
  }

  submit(): void {
    //console.log(this.awardForm.value);
    this.showSavingMessage();

    this.api
      .postMethod({ ...this.awardForm.value }, `/awards/${this.record_id}`)
      .subscribe((r: any) => {
        console.log('r: ', r);
        if (r.err) {
          console.log('r: ', r);
        } else {
         /*  const id = r.data._id;
          console.log('id: ', id); */
        }
        this.savingMessage = 'Datos insertados con éxito';
        this.isSaving = false;
      });
  }
}
