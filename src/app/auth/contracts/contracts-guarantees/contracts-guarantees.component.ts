import { Currency, Guarantees, GuaranteeTypes } from 'src/utils';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService, IPartieList } from 'src/app/services/api.service';

@Component({
  selector: 'app-contracts-guarantees',
  templateUrl: './contracts-guarantees.component.html',
  styleUrls: ['./contracts-guarantees.component.css'],
})
export class ContractsGuaranteesComponent implements OnInit {
  @Input() guaranteesArray: Array<any> = [];
  @Output() addGuarante = new EventEmitter<any>();
  @Output() deleteGuarante = new EventEmitter<any>();

  guaranteesForm!: FormGroup;
  record_id = null;
  currency = Currency;
  guarantor: any = [];

  guarantees = Guarantees;
  guaranteeTypes = GuaranteeTypes;
  
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  addNewGuarante(): void {
    this.addGuarante.emit(this.guaranteesForm);
    console.log('this.guaranteesForm: ', this.guaranteesForm.value);
    this.initForm();
  }

  getGuaranteeDesc(code: string): string {
    const guarantee = this.guarantees.find(g => g.code === code);
    return guarantee ? guarantee.description : '';
  }

  getGuaranteeTypeDesc(code: string): string {
    const guaranteeType = this.guaranteeTypes.find(g => g.code === code);
    return guaranteeType ? guaranteeType.description : '';
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
    });

    if (this.record_id) {
      this.api.getPartiesByType(this.record_id).subscribe((d: IPartieList) => {
        this.guarantor = d.data;
      });
    }

    this.initForm();
  }

  initForm(): void {
    this.guaranteesForm = this.fb.group({
      type: ['', [Validators.required]],
      date: ['', [Validators.required]],
      obligations: ['', [Validators.required]],
      value: this.fb.group({
        amount: ['0', [Validators.required]],
        currency: ['MXN', [Validators.required]],
      }),
      guarantor: ['', [Validators.required]],
      period: this.fb.group({
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]],
        durationInDays: ['', [Validators.required]],
        maxExtentDate: ['', [Validators.required]],
      }),
    });
  }
}
