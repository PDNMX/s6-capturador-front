import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  @Output() saveGeneralData = new EventEmitter<any>();

  record_id = null;

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

    requestingUnits.forEach((e: any) => {
      this.requestingUnitsArray.push(this.fb.group(e));
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

  initContractingUnitsForm(): void {
    this.contractingUnitsForm = this.fb.group({
      name: ['', Validators.required],
      id: ['', Validators.required],
    });
  }

  initRequestingUnitsForm(): void {
    this.requestingUnitsForm = this.fb.group({
      name: ['', Validators.required],
      id: ['', Validators.required],
    });
  }

  initResponsibleUnitsForm(): void {
    this.responsibleUnitsForm = this.fb.group({
      name: ['', Validators.required],
      id: ['', Validators.required],
    });
  }


  initForm(): void {
    this.generalForm = this.fb.group({
      rationale: ['', Validators.required],
      hasQuotes: ['', Validators.required],
      contractingUnits: this.fb.array([]),
      requestingUnits: this.fb.array([]),
      responsibleUnits: this.fb.array([]),
    });
    this.initContractingUnitsForm();
    this.initRequestingUnitsForm()
    this.initResponsibleUnitsForm()

  }


  saveForm(): void {
    this.saveGeneralData.emit(this.generalForm.controls);
  }


  get contractingUnitsFormArray() {
    return this.generalForm.controls['contractingUnits'] as FormArray;
  }

  addContractingUnits(): void {
    this.contractingUnitsFormArray.push(this.contractingUnitsForm);
    this.initContractingUnitsForm();
  }

  deleteContractingUnit(index:number): void {
    this.contractingUnitsFormArray.removeAt(index);
  }


  get requestingUnitsArray() {
    return this.generalForm.controls['requestingUnits'] as FormArray;
  }

  addRequestingUnits(): void {
    this.requestingUnitsArray.push(this.requestingUnitsForm);
    this.initRequestingUnitsForm();
  }
  deleteRequestingUnit(index:number): void {
    this.requestingUnitsArray.removeAt(index);
  }



  get responsibleUnitsArray() {
    return this.generalForm.controls['responsibleUnits'] as FormArray;
  }

  addResponsibleUnits(): void {
    this.responsibleUnitsArray.push(this.responsibleUnitsForm);
    this.initResponsibleUnitsForm();
  }
  deleteResponsibleUnit(index:number): void {
    this.responsibleUnitsArray.removeAt(index);
  }


}
