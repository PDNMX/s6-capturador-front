import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService, IPartieList } from 'src/app/services/api.service';
import {
  AdditionalProcurementCategories,
  AwardCriteria,
  Currency,
  MainProcurementCategory,
  ProcurementMethod,
  SubmissionMethod,
  TenderStatus,
} from 'src/utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tender-general',
  templateUrl: './tender-general.component.html',
  styleUrls: ['./tender-general.component.css'],
})
export class TenderGeneralComponent implements OnInit {
  @Output() saveGeneralData = new EventEmitter<any>();

  record_id = null;

  tenderStatus = TenderStatus;
  currency = Currency;
  procurementMethod = ProcurementMethod;
  mainProcurementCategory = MainProcurementCategory;
  additionalProcurementCategories = AdditionalProcurementCategories;

  awardCriteria = AwardCriteria;
  submissionMethod = SubmissionMethod;

  procuringEntity: any = [];

  generalForm!: FormGroup;
  additionalProcurementCategoriesForm!: FormGroup;
  submissionMethodForm!: FormGroup;
  mostrarSpinner = false;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  getPartiesListTitle(roles: Array<string>): string {
    return this.api.getPartiesListTitle(roles);
  }

  setSelectValue(element: string, value: any): void {
    this.generalForm.get(element)?.setValue(value);
  }

  loadForm(data: any): void {
    const {
      title,
      description,
      status,
      procuringEntity,
      value,
      minValue,
      procurementMethod,
      procurementMethodDetails,
      procurementMethodRationale,
      mainProcurementCategory,
      additionalProcurementCategories,
      awardCriteria,
      awardCriteriaDetails,
      submissionMethod,
      submissionMethodDetails,
      tenderPeriod,
      enquiryPeriod,
      hasEnquiries,
      eligibilityCriteria,
      awardPeriod,
      contractPeriod,
    } = data;

    let optProcuringEntity = null;

    if (procuringEntity)
      optProcuringEntity = this.procuringEntity.find(
        (e: any) => (e.id = procuringEntity.id)
      );

    this.generalForm.patchValue({
      title,
      description,
      status,
      value,
      minValue,
      procurementMethod,
      procurementMethodDetails,
      procurementMethodRationale,
      mainProcurementCategory,
      awardCriteria,
      awardCriteriaDetails,
      submissionMethod,
      submissionMethodDetails,
      tenderPeriod,
      enquiryPeriod,
      hasEnquiries,
      eligibilityCriteria,
      awardPeriod,
      contractPeriod,
    });

    additionalProcurementCategories.forEach((e: string) => {
      this.additionalProcurementCategoriesArray.push(this.fb.control(e));
    });

    submissionMethod.forEach((e: string) => {
      this.submissionMethodArray.push(this.fb.control(e));
    });

    this.setSelectValue('procuringEntity', optProcuringEntity);
  }

  loadData(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
    });

    this.api.getMethod(`/tender/${this.record_id}`).subscribe((d: any) => {
      const { tender, error, message } = d;

      if (error) {
        console.log('message: ', message);
      } else {
        // load forms
        if (tender !== null) this.loadForm(tender);
      }
    });
  }

  ngOnInit(): void {
    this.initForm();

    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
    });

    if (this.record_id) {
      this.api
        .getPartiesByType(this.record_id, 'procuringEntity')
        .subscribe((d: IPartieList) => {
          this.procuringEntity = d.data;
        });
    }

    this.loadData();
  }

  initForm(): void {
    this.generalForm = this.fb.group({
      status: [null, Validators.required],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      procuringEntity: ['', [Validators.required]],
      value: this.fb.group({
        amount: [null],
        currency: ['MXN'],
      }),
      minValue: this.fb.group({
        amount: [null],
        currency: ['MXN'],
      }),
      procurementMethod: ['', [Validators.required]],
      procurementMethodDetails: ['', [Validators.required]],
      procurementMethodRationale: ['', [Validators.required]],
      mainProcurementCategory: [null],
      additionalProcurementCategories: this.fb.array([]),
      awardCriteria: ['', [Validators.required]],
      awardCriteriaDetails: ['', [Validators.required]],
      submissionMethod: this.fb.array([]),
      submissionMethodDetails: [null],
      tenderPeriod: this.fb.group(
        {
          startDate: ['', [Validators.required]],
          endDate: ['', [Validators.required]],
          maxExtentDate: [null],
          durationInDays: [0],
        },
        { validators: this.dateComparisonValidator() }
      ),
      enquiryPeriod: this.fb.group(
        {
          startDate: ['', [Validators.required]],
          endDate: ['', [Validators.required]],
          maxExtentDate: [null],
          durationInDays: [0],
        },
        { validators: this.dateComparisonValidator() }
      ),
      hasEnquiries: [null, [Validators.nullValidator]],
      awardPeriod: this.fb.group(
        {
          startDate: ['', [Validators.required]],
          endDate: ['', [Validators.required]],
          maxExtentDate: [null],
          durationInDays: [0],
        },
        { validators: this.dateComparisonValidator() }
      ),
      contractPeriod: this.fb.group(
        {
          startDate: [null],
          endDate: [null],
          maxExtentDate: [null],
          durationInDays: [0],
        },
        { validators: this.dateComparisonValidator() }
      ),

      eligibilityCriteria: [null],
      numberOfTenderers: [0, [Validators.required]],
    });

    this.additionalProcurementCategoriesForm = this.fb.group({
      data: [''],
    });

    this.submissionMethodForm = this.fb.group({
      data: ['', [Validators.nullValidator]],
    });
  }

  get title() {
    return this.generalForm.get('title') as FormControl;
  }
  get description() {
    return this.generalForm.get('description') as FormControl;
  }
  get status(): FormControl {
    return this.generalForm.get('status') as FormControl;
  }
  get procuringEntitylist(): FormControl {
    return this.generalForm.get('procuringEntity') as FormControl;
  }
  get amount() {
    return this.generalForm.get('value')?.get('amount') as FormControl;
  }
  get amount_min() {
    return this.generalForm.get('minValue')?.get('amount') as FormControl;
  }
  get MainProcurementCategory() {
    return this.generalForm.get('mainProcurementCategory') as FormControl;
  }
  get awardCriteriaList() {
    return this.generalForm.get('awardCriteria') as FormControl;
  }
  get procurementMethodlist(): FormControl {
    return this.generalForm.get('procurementMethod') as FormControl;
  }
  get procurementMethodDetails() {
    return this.generalForm.get('procurementMethodDetails') as FormControl;
  }
  get procurementMethodRationale() {
    return this.generalForm.get('procurementMethodRationale') as FormControl;
  }
  get awardCriteriaDetails() {
    return this.generalForm.get('awardCriteriaDetails') as FormControl;
  }
  get eligibilityCriteria() {
    return this.generalForm.get('eligibilityCriteria') as FormControl;
  }
  /* get SubmissionMethod() {
    return this.generalForm.get('submissionMethod') as FormControl;
  } */
  get tenderPeriodForm() {
    return this.generalForm.get('tenderPeriod') as FormGroup;
  }
  getControl(name: string): FormControl {
    return this.tenderPeriodForm.get(name) as FormControl;
  }
  get awardPeriodForm() {
    return this.generalForm.get('awardPeriod') as FormGroup;
  }
  getControlAwardPeriod(name: string): FormControl {
    return this.awardPeriodForm.get(name) as FormControl;
  }
  get contractPeriodForm() {
    return this.generalForm.get('contractPeriod') as FormGroup;
  }
  getControlContractPeriod(name: string): FormControl {
    return this.contractPeriodForm.get(name) as FormControl;
  }
  get enquiryPeriodForm() {
    return this.generalForm.get('enquiryPeriod') as FormGroup;
  }
  getControlEnquiryPeriod(name: string): FormControl {
    return this.enquiryPeriodForm.get(name) as FormControl;
  }

  // Validador para comparar fechas
  private dateComparisonValidator(): Validators {
    return (group: AbstractControl): ValidationErrors | null => {
      const startDate = group.get('startDate')?.value;
      const endDate = group.get('endDate')?.value;
      const maxExtentDate = group.get('maxExtentDate')?.value;

      if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
        group.get('endDate')?.setErrors({ dateInvalid: true });
        return { dateInvalid: true };
      }

      if (
        maxExtentDate &&
        endDate &&
        new Date(maxExtentDate) < new Date(endDate)
      ) {
        group.get('maxExtentDate')?.setErrors({ maxDateInvalid: true });
        return { maxDateInvalid: true };
      }

      return null;
    };
  }

  enableSaveFormButton(): boolean {
    return this.generalForm.valid;
  }

  saveForm(): void {
    if (!this.enableSaveFormButton()) {
      console.warn('El formulario no es válido.');
      return;
    }

    this.mostrarSpinner = true;
    this.saveGeneralData.emit(this.generalForm.controls);
    setTimeout(() => {
      this.mostrarSpinner = false;
      console.log('Formulario guardado correctamente.');
    }, 1000);
  }

  get additionalProcurementCategoriesArray() {
    return this.generalForm.controls[
      'additionalProcurementCategories'
    ] as FormArray;
  }

  addAdditionalProcurementCategories(): void {
    const opt: string = this.additionalProcurementCategoriesForm.value.data;

    if (!opt) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe seleccionar una categoría para agregarla.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#dc3545',
      });
      return;
    }

    const yaExiste =
      this.additionalProcurementCategoriesArray.value.includes(opt);

    if (yaExiste) {
      Swal.fire({
        icon: 'warning',
        title: 'Categoría duplicada',
        text: 'La categoría adicional ya fue agregada.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#ffc107',
      });
      return;
    }

    this.additionalProcurementCategoriesArray.push(this.fb.control(opt));
    this.additionalProcurementCategoriesForm.reset();
  }

  deleteAdditionalProcurementCategories(index: number): void {
    this.additionalProcurementCategoriesArray.removeAt(index);
  }

  get submissionMethodArray() {
    return this.generalForm.controls['submissionMethod'] as FormArray;
  }

  addSubmissionMethod(): void {
    const opt: string = this.submissionMethodForm.value.data;
    if (!opt) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe seleccionar un método de presentación para agregarlo.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#dc3545',
      });
      return;
    }

    const yaExiste = this.submissionMethodArray.value.includes(opt);

    if (yaExiste) {
      Swal.fire({
        icon: 'warning',
        title: 'Método duplicado',
        text: 'Este método de presentación ya fue agregado.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#ffc107',
      });
      return;
    }
    this.submissionMethodArray.push(this.fb.control(opt));
    this.submissionMethodForm.reset();
  }

  deleteSubmissionMethod(index: number): void {
    this.submissionMethodArray.removeAt(index);
  }

  // submissionMethod
  getTenderStatusDesc(code: string): string {
    let dec = '';
    this.tenderStatus.forEach((t) => {
      if (t.code === code) dec = t.description;
    });

    return dec;
  }

  getProcurementMethod(code: string): string {
    let dec = '';
    this.procurementMethod.forEach((t) => {
      if (t.code === code) dec = t.description;
    });

    return dec;
  }

  getMainProcurementCategory(code: string): string {
    let dec = '';
    this.mainProcurementCategory.forEach((t) => {
      if (t.code === code) dec = t.description;
    });

    return dec;
  }

  getAdditionalProcurementCategoriesDesc(code: string): string {
    let dec = '';
    this.additionalProcurementCategories.forEach((t) => {
      if (t.code === code) dec = t.description;
    });

    return dec;
  }

  getAdditionalProcurementCategoriesTitle(code: string): string {
    let dec = '';
    this.additionalProcurementCategories.forEach((t) => {
      if (t.code === code) dec = t.title;
    });

    return dec;
  }

  getSubmissionMethodDesc(code: string): string {
    let dec = '';
    this.submissionMethod.forEach((t) => {
      if (t.code === code) dec = t.description;
    });

    return dec;
  }

  getSubmissionMethodTitle(code: string): string {
    let dec = '';
    this.submissionMethod.forEach((t) => {
      if (t.code === code) dec = t.title;
    });

    return dec;
  }

  getAwardCriteriaDesc(code: string): string {
    let dec = '';
    this.awardCriteria.forEach((t) => {
      if (t.code === code) dec = t.description;
    });

    return dec;
  }
  
}
