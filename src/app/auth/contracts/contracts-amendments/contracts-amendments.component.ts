import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-contracts-amendments',
  templateUrl: './contracts-amendments.component.html',
  styleUrls: ['./contracts-amendments.component.css'],
})
export class ContractsAmendmentsComponent {
  @Input() amendmentsArray: Array<any> = [];
  @Output() addAmendment = new EventEmitter<any>();
  @Output() deleteAmendment = new EventEmitter<any>();

  record_id = null;
  amendmentsForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  loadForm(data: any): void {
    data.forEach((amendment: any) => {
      this.addAmendment.emit(this.fb.group({ ...amendment }));
    });
  }

  loadData(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
    });

    this.api.getMethod(`/tender/${this.record_id}`).subscribe((d: any) => {
      const { tender, error, message } = d;

      if (error) {
        console.log('message: ', message);
      } else {
        // load forms
        // if (tender !== null) this.loadForm(tender.amendments);
      }
    });
  }

  ngOnInit(): void {
    this.initForm();
    this.loadData();
  }

  initForm(): void {
    this.amendmentsForm = this.fb.group({
      id: ['', [Validators.required]],
      date: ['', [Validators.required]],
      rationale: ['', [Validators.required]],
      description: ['', [Validators.required]],
      amendsReleaseID: ['', [Validators.required]],
      releaseID: ['', [Validators.required]],
    });
  }

  addNewAmendment(): void {
    this.addAmendment.emit(this.amendmentsForm);
    this.initForm();
  }
}
