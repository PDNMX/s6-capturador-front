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
export class PlanningGeneralComponent implements OnInit{
  @Output() saveGeneralData = new EventEmitter<any>();

  record_id: string = '';

  currency = Currency;

  generalForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService
  ) { }

  setSelectValue(element: string, value:any): void {
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
    //this.loadData();
  }

  initForm(): void {
    this.generalForm = this.fb.group({
      rationale: ['', Validators.required],
      hasQuotes: ['', Validators.required],
      contractingUnits: this.fb.group({ 
        name: ['', Validators.required],
        id: ['', Validators.required],
        description: ['', Validators.required],
        type: ['', Validators.required],
        parent: ['', Validators.required],
        currency: ['', Validators.required],
      }),
      requestingUnits: this.fb.group({ 
        name: ['', Validators.required],
        id: ['', Validators.required],
        description: ['', Validators.required],
        type: ['', Validators.required],
        parent: ['', Validators.required],
        currency: ['', Validators.required],
      }),
      responsibleUnits: this.fb.group({ 
        name: ['', Validators.required],
        id: ['', Validators.required],
        description: ['', Validators.required],
        type: ['', Validators.required],
        parent: ['', Validators.required],
        currency: ['', Validators.required],
      }),
    });
  }

}