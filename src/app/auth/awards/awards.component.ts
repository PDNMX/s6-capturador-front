import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.css']
})
export class AwardsComponent implements OnInit {
  
  constructor(private fb: FormBuilder) { }
  ngOnInit() { }

    Awards = this.fb.group({
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
        durationInDays: ['', Validators.required]
      })
    });

    AwardsSuppliers = this.fb.group({
      
    })
  onSubmit(): void {
    console.log(this.Awards.value);
  }
}
