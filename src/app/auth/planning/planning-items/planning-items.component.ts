import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

import { 
  Currency 
} from 'src/utils';

@Component({
  selector: 'app-planning-items',
  templateUrl: './planning-items.component.html',
  styleUrls: ['./planning-items.component.css']
})
export class PlanningItemsComponent implements OnInit{
  @Input() itemsArray: Array<any> = [];
  @Output() additems = new EventEmitter<any>();  

  record_id: string = '';
  planningItemsForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm  (): void {
    this.planningItemsForm = this.fb.group({
      id: ['', Validators.required],
      description: ['', Validators.required],
      quantity: ['', Validators.required],
      unit: this.fb.group({
        id: ['', Validators.required],
        scheme: ['', Validators.required],
        name: ['', Validators.required],
        uri: ['', Validators.required],
      }),
      additionalClassifications: this.fb.array([]),
    }); 
  }
}
