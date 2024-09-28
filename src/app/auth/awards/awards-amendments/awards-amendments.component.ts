import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-awards-amendments',
  templateUrl: './awards-amendments.component.html',
  styleUrls: ['./awards-amendments.component.css'],
})
export class AwardsAmendmentsComponent implements OnInit {
  @Input() amendmentsArray: Array<any> = [];
  @Output() addAmendment = new EventEmitter<any>();
  @Output() deleteAmendment = new EventEmitter<any>();
  record_id = '';

  amendmentsForm!: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService, private route: ActivatedRoute) {}

  loadForm(data: any): void {
    data.forEach((amendment: any) => {
      this.addAmendment.emit(this.fb.group({ ...amendment }));
    });
  }

  loadData(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
    });

    this.api.getMethod(`/awards/${this.record_id}`).subscribe((d: any) => {
      const { award, error, message } = d;
      if (error) {
        console.log('message', message);
      } else {
        if (award !== null) this.loadForm(award.amendments);
      }
    });
  }

  ngOnInit(): void {
    this.initForm();
    this.loadData();
  }

  initForm(): void {
    this.amendmentsForm = this.fb.group({
      date: ['', Validators.required],
      rationale: ['', Validators.required],
      description: ['', Validators.required],
      amendsReleaseID: ['', Validators.required],
      releaseID: ['', Validators.required],
    });
  }

addNewAmendment(): void {
    this.addAmendment.emit(this.amendmentsForm);
    //console.log(this.amendmentsForm.value);
    this.initForm();
  }
}
