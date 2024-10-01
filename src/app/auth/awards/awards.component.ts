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
  awardsForm!: FormGroup;
  record_id = null;

  editMode: boolean = false;

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

  newAward(): void {
    this.editMode = true;
  }

  deleteAward(index: number): void {
    this.awardsArray.removeAt(index);
    this.saveData();
  }

  getAward(): string {
    return JSON.stringify(this.awardForm.value, undefined, 4);
  }

  get awardsArray() {
    return this.awardsForm.controls['awards'] as FormArray;
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

  saveAward(): void {
    const awards = this.awardsArray;
    awards.push(this.awardForm);
    this.initAwardForm();
    this.saveData();
    this.editMode = false;
  }

  loadData(): void {
    this.api.getMethod(`/awards/${this.record_id}`).subscribe((d: any) => {
      const { awards, error, message } = d;
      if (error) {
        console.log('message: ', message);
      } else {
        if (awards !== null) this.loadForm(awards);
      }
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
      //this.loadExistingData();
    });

    this.initForm();
    this.loadData();
  }

  initAwardForm(): void {
    this.awardForm = this.fb.group({
      suppliers: this.fb.array([], [Validators.required]),
      items: this.fb.array([], [Validators.required]),
      documents: this.fb.array([], [Validators.required]),
      amendments: this.fb.array([], [Validators.required]),
    });
  }

  initForm(): void {
    this.awardsForm = this.fb.group({
      awards: this.fb.array([]),
    });
    this.initAwardForm();
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

  loadForm(data: any): void {
    console.log('data', data);
    data.forEach((award: any) => {
      this.awardsArray.push(this.fb.control(award));
    });
    console.log('load awardForm', this.awardForm.value);
  }

  saveData(): void {
    console.log('awardsForm', this.awardsForm.value);
    this.api
      .postMethod({ ...this.awardsForm.value }, `/awards/${this.record_id}`)
      .subscribe((r: any) => {
        console.log('r: ', r);
        if (r.err) {
          console.log('r: ', r);
        } else {
          this.initForm();
          this.loadData();
          /*  const id = r.data._id;
        console.log('id: ', id); */
        }
        this.savingMessage = 'Datos insertados con éxito';
        this.isSaving = false;
      });
  }
}
