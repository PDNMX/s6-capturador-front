import { AwardsSuppliersComponent } from './../awards-suppliers/awards-suppliers.component';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  currency = Currency;
  language = Language;
  awardStatus = AwardStatus;

  generalForm!: FormGroup;

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

  initForm(): void {
    this.generalForm = this.fb.group({
      id: ['', Validators.required],
      status: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      rationale: ['', Validators.required],
      date: ['', Validators.required],
      value: this.fb.group({
        amount: ['', Validators.required],
        currency: ['', Validators.required],
      }),
      contractPeriod: this.fb.group({
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        maxExtentDate: ['', Validators.required],
        durationInDays: ['', Validators.required],
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
    const data = {
      ...this.generalForm.value,
    };
    this.saveGeneralDataForm.emit(this.generalForm.controls);
    //console.log(data);
  }
}
