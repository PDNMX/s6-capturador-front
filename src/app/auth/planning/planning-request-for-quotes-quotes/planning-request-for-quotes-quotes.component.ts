import { Currency } from 'src/utils';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService, IPartieList } from 'src/app/services/api.service';

@Component({
  selector: 'app-planning-request-for-quotes-quotes',
  templateUrl: './planning-request-for-quotes-quotes.component.html',
  styleUrls: ['./planning-request-for-quotes-quotes.component.css'],
})
export class PlanningRequestForQuotesQuotesComponent implements OnInit {
  @Input() quotesArray: Array<any> = [];
  @Output() addQuotes = new EventEmitter<any>();
  @Output() deleteQuotes = new EventEmitter<any>();

  record_id = null;
  currency = Currency;
  quotesForm!: FormGroup;

  issuingSupplier: any = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
    });

    if (this.record_id) {
      this.api.getPartiesByType(this.record_id).subscribe((d: IPartieList) => {
        this.issuingSupplier = d.data;
      });
    }
  }

  initForm(): void {
    this.quotesForm = this.fb.group({
      id: [null, [Validators.required]],
      description: [null, [Validators.required]],
      date: [null, [Validators.required]],
      items: this.fb.array([]),
      value: this.fb.group({
        amount: [0, [Validators.required]],
        currency: ['MXN', [Validators.required]],
      }),
      period: this.fb.group({
        startDate: [null, [Validators.required]],
        endDate: [null, [Validators.required]],
        maxExtentDate: [null, [Validators.required]],
        durationInDays: [null, [Validators.required]],
      }),
      issuingSupplier: [null, [Validators.required]],
    });
  }
}
