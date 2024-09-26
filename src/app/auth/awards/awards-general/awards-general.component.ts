import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Currency, Language, AwardStatus } from 'src/utils';

@Component({
  selector: 'app-awards-general',
  templateUrl: './awards-general.component.html',
  styleUrls: ['./awards-general.component.css'],
})
export class AwardsGeneralComponent implements OnInit {
  @Output() saveGeneralDataForm = new EventEmitter<any>();
  currency = Currency;
  language = Language;
  awardStatus = AwardStatus;

  generalForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
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
  }
}
