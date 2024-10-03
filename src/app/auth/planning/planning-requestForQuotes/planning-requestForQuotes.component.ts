import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

import { 
  Currency 
} from 'src/utils';

@Component({
  selector: 'app-planning-requestForQuotes',
  templateUrl: './planning-requestForQuotes.component.html',
  styleUrls: ['./planning-requestForQuotes.component.css']
})
export class PlanningRequestForQuotesComponent implements OnInit{
@Output() saveRequestForQuotesData = new EventEmitter<any>();  

  record_id: string = '';

  requestForQuotesForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService
  ) { }

  setSelectValue(element: string, value: any): void {
    this.requestForQuotesForm.get(element)?.setValue(value);
  } 

  loadForm(data: any): void {
    const {
      id,
      title,
      description,
      period,
      items,
      uri,
    } = data;

    this.requestForQuotesForm.patchValue({
      id,
      title,
      description,
      period,
      items,
      uri,
    });
    
  }

  loadData(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
    });

    this.api.getMethod(`/planning/${this.record_id}`).subscribe((d: any) => {
      const { planning, error, message } = d;

      if (error) {
        console.log('message: ', message);
      } else {
        // load forms
        if (planning !== null) this.loadForm(planning);
      }
    });
  }

  ngOnInit(): void {
    this.initForm();
    this.loadData();
  }

  initForm  (): void {
    this.requestForQuotesForm = this.fb.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      period: this.fb.group({
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        maxExtentDate: ['', Validators.required],
        durationInDays: ['', Validators.required],
      }),
      items: this.fb.array([]),
      uri: ['', Validators.required],
    }); 
  }

  saveForm(): void {
    this.saveRequestForQuotesData.emit(this.requestForQuotesForm);
  }   


}
