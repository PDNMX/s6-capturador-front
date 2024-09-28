import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

import {
  Currency
} from 'src/utils';

@Component({
  selector: 'app-planning-general',
  templateUrl: './planning-general.component.html',
  styleUrls: ['./planning-general.component.css']
})
export class PlanningGeneralComponent implements OnInit {
  @Input() contractingUnitsArray: Array<any> = [];
  @Output() saveGeneralData = new EventEmitter<any>();


  record_id: string = '';

  currency = Currency;

  generalForm!: FormGroup;
  contractingUnitsForm!: FormGroup;
  requestingUnitsForm!: FormGroup;
  responsibleUnitsForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService
  ) { }

  setSelectValue(element: string, value: any): void {
    this.generalForm.get(element)?.setValue(value);
  }

  loadForm(data: any): void {
    const {
      rationale,
      hasQuotes,
      contractingUnits,
      requestingUnits,
      responsibleUnits
    } = data;

    this.generalForm.patchValue({
      rationale,
      hasQuotes,
      contractingUnits,
      requestingUnits,
      responsibleUnits  
    });


  }

  loadData(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
      console.log('planning id: ', this.record_id);
    });

    this.api.getMethod(`/planning/${this.record_id}`).subscribe((r: any) => {
      const { planning, error, message } = r;
      if (error) {
        console.log('message: ', message);
      } else {
        //load forms
        if (planning !== null) this.loadForm(planning);
      }
    });
  }

  ngOnInit(): void {
    this.initForm();
    this.loadData();
  }

  initForm(): void {
    this.generalForm = this.fb.group({
      rationale: ['', Validators.required],
      hasQuotes: ['', Validators.required],
      contractingUnits: this.fb.array([]),
      requestingUnits: this.fb.array([]),
      responsibleUnits: this.fb.array([]),
    });
    this.contractingUnitsForm = this.fb.group({
      name: ['', Validators.required],
      id: ['', Validators.required],
    });
    this.requestingUnitsForm = this.fb.group({
      name: ['', Validators.required],
      id: ['', Validators.required],
    });
    this.responsibleUnitsForm = this.fb.group({
      name: ['', Validators.required],
      id: ['', Validators.required],
    });
  }


  getContractingUnitsArray() {
    return this.generalForm.controls['contractingUnits'] as FormArray;
  }
  addContractingUnits(): void {
    const opt: string = this.contractingUnitsForm.value;
    this.getContractingUnitsArray().push(this.fb.group(opt));
  }
  deleteContractingUnit(): void { }


  getRequestingUnitsArray() {
    return this.generalForm.controls['requestingUnits'] as FormArray;
  }
  addRequestingUnits(): void {
    const opt: string = this.requestingUnitsForm.value;
    this.getRequestingUnitsArray().push(this.fb.group(opt));
  }
  deleteRequestingUnit(): void { }


  getResponsibleUnitsArray() {
    return this.generalForm.controls['responsibleUnits'] as FormArray;
  }
  addResponsibleUnits(): void {
    const opt: string = this.responsibleUnitsForm.value;
    this.getResponsibleUnitsArray().push(this.fb.group(opt));
  }
  deleteResponsibleUnit(): void { }



  saveForm(): void {
    this.saveGeneralData.emit(this.generalForm.controls);
  }
 


}