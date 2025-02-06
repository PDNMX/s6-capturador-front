import { AwardsSuppliersComponent } from './../awards-suppliers/awards-suppliers.component';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Currency, Language, AwardStatus } from 'src/utils';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-awards-general',
  templateUrl: './awards-general.component.html',
  styleUrls: ['./awards-general.component.css'],
})
export class AwardsGeneralComponent implements OnInit {
  @Output() saveGeneralDataForm = new EventEmitter<any>();

  record_id: string = '';

  data_currency = Currency;
  language = Language;
  awardStatus = AwardStatus;

  generalForm!: FormGroup;

  mostrarSpinner = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute
  ) {}

  loadForm(data: any): void {
    const {
      title,
      description,
      rationale,
      date,
      value,
      contractPeriod,
      status,
    } = data;

    this.generalForm.patchValue({
      title,
      description,
      rationale,
      date,
      value,
      contractPeriod,
      status,
    });
  }

  /*   loadData(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
    });

    this.api.getMethod(`/awards/${this.record_id}`).subscribe((d: any) => {
      const { awards, error, message } = d;
      if (error) {
        console.log('error: ', error);
        console.log('message: ', message);
      } else {
        if (awards !== null) this.loadForm(awards);
      }
    });
  } */

  ngOnInit(): void {
    this.initForm();
    //this.loadData();
  }

  get id(): FormControl {
    return this.generalForm.get('id') as FormControl;
  }

  get status(): FormControl {
    return this.generalForm.get('status') as FormControl;
  }

  get title(): FormControl {
    return this.generalForm.get('title') as FormControl;
  }

  get description(): FormControl {
    return this.generalForm.get('description') as FormControl;
  }

  get rationale(): FormControl {
    return this.generalForm.get('rationale') as FormControl;
  }

  get date(): FormControl {
    return this.generalForm.get('date') as FormControl;
  }

  get value(): FormGroup {
    return this.generalForm.get('value') as FormGroup;
  }

  get amount(): FormControl {
    return this.value.get('amount') as FormControl;
  }

  get currency(): FormControl {
    return this.value.get('currency') as FormControl;
  }

  // end value

  get contractPeriod(): FormGroup {
    return this.generalForm.get('contractPeriod') as FormGroup;
  }

  get startDate(): FormControl {
    return this.contractPeriod.get('startDate') as FormControl;
  }

  get endDate(): FormControl {
    return this.contractPeriod.get('endDate') as FormControl;
  }

  get maxExtentDate(): FormControl {
    return this.contractPeriod.get('maxExtentDate') as FormControl;
  }

  get durationInDays(): FormControl {
    return this.contractPeriod.get('durationInDays') as FormControl;
  }

  // end contractPeriod

  initForm(): void {
    this.generalForm = this.fb.group({
      id: ['', [Validators.required]],
      status: ['', [Validators.required]],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      rationale: ['', [Validators.required]],
      date: ['', [Validators.required]],
      value: this.fb.group({
        amount: ['', [Validators.required]],
        currency: ['', [Validators.required]],
      }),
      contractPeriod: this.fb.group({
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]],
        maxExtentDate: ['', [Validators.required]],
        durationInDays: ['', [Validators.required]],
      }),
    });
  }
  getAwardStatusDesc(code: string): string {
    let desc = '';
    AwardStatus.forEach((status) => {
      if (status.code === code) desc = status.description;
    });

    return desc;
  }
  saveForm(): void {
    this.mostrarSpinner = true;
    const data = {
      ...this.generalForm.value,
    };
    this.saveGeneralDataForm.emit(this.generalForm.controls);
    //console.log(data);
    setTimeout(() => {
      this.mostrarSpinner = false;
      console.log('agregando al arreglo');
    }, 1000);
  }
}
