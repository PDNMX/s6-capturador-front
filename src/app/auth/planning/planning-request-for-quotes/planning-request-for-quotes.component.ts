import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService, IPartieList } from 'src/app/services/api.service';

@Component({
  selector: 'app-planning-request-for-quotes',
  templateUrl: './planning-request-for-quotes.component.html',
  styleUrls: ['./planning-request-for-quotes.component.css'],
})
export class PlanningRequestForQuotesComponent implements OnInit {
  @Input() requestForQuotesArray: Array<any> = [];
  @Output() addRequestForQuotes = new EventEmitter<any>();
  @Output() deleteRequestForQuotes = new EventEmitter<any>();

  @Output() saveRequestForQuotesData = new EventEmitter<any>();

  record_id = null;

  requestForQuotesForm!: FormGroup;
  selectForm!: FormGroup;

  invitedSuppliers: any = [];
  mostrarSpinner = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  get quotesArray() {
    return this.requestForQuotesForm.controls['quotes'] as FormArray;
  }

  addQuotes(opt: any) {
    this.quotesArray.push(opt);
  }
  deleteQuotes(index: number) {
    this.quotesArray.removeAt(index);
  }

  get invitedSuppliersArray() {
    return this.requestForQuotesForm.controls['invitedSuppliers'] as FormArray;
  }

  addInvitedSuppliers(): void {
    console.log(
      'this.selectForm.value.invitedSuppliers: ',
      this.selectForm.value.invitedSuppliers
    );
    this.invitedSuppliersArray.push(
      this.fb.control(this.selectForm.value.invitedSuppliers)
    );
  }

  deleteInvitedSuppliers(index: number): void {
    this.invitedSuppliersArray.removeAt(index);
  }

  get itemsArray() {
    return this.requestForQuotesForm.controls['items'] as FormArray;
  }

  addItem(opt: any): void {
    this.itemsArray.push(opt);
  }

  deleteItem(index: number): void {
    this.itemsArray.removeAt(index);
  }

  setSelectValue(element: string, value: any): void {
    this.requestForQuotesForm.get(element)?.setValue(value);
  }

  loadData(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
    });

    this.api.getMethod(`/planning/${this.record_id}`).subscribe((d: any) => {
      const { planning, error, message } = d;
      console.log('planning: ', planning);

      if (error) {
        console.log('message: ', message);
      } else {
        // load forms
        if (planning.requestForQuotes !== null) {
          // this.loadForm(planning.requestForQuotes);
        }
      }
    });
  }

  ngOnInit(): void {
    this.initForm();

    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
    });

    if (this.record_id) {
      this.api.getPartiesByType(this.record_id).subscribe((d: IPartieList) => {
        this.invitedSuppliers = d.data;
      });
    }

    this.loadData();
  }

  initForm(): void {
    this.requestForQuotesForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      period: this.fb.group({
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        maxExtentDate: ['', Validators.required],
        durationInDays: ['', Validators.required],
      }),
      items: this.fb.array([]),
      invitedSuppliers: this.fb.array([]),
      quotes: this.fb.array([]),
      uri: ['', Validators.required],
    });

    this.initSelectForm();
  }

  initSelectForm(): void {
    this.selectForm = this.fb.group({
      invitedSuppliers: ['', [Validators.required]],
    });
  }

  addNewRequestForQuotes(): void {
    this.mostrarSpinner = true;
    this.addRequestForQuotes.emit(this.requestForQuotesForm);
    console.log('this.requestForQuotesForm: ', this.requestForQuotesForm.value);
    this.initForm();
    setTimeout(() => {
      this.mostrarSpinner = false;
      console.log('agregando al arreglo');
    }, 1000);
  }
}
