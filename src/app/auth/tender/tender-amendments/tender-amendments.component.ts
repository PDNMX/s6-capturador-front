import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-tender-amendments',
  templateUrl: './tender-amendments.component.html',
  styleUrls: ['./tender-amendments.component.css'],
})
export class TenderAmendmentsComponent implements OnInit {
  @Input() amendmentsArray: Array<any> = [];
  @Output() addAmendment = new EventEmitter<any>();
  @Output() deleteAmendment = new EventEmitter<any>();

  record_id = null;
  amendmentsForm!: FormGroup;
  mostrarSpinner = false;
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
        if (tender !== null) this.loadForm(tender.amendments);
      }
    });
  }

  ngOnInit(): void {
    this.initForm();
    this.loadData();
  }

  initForm(): void {
    this.amendmentsForm = this.fb.group({
      date: ['', [Validators.required]],
      rationale: ['', [Validators.required]],
      description: ['', [Validators.required]],
      amendsReleaseID: ['', [Validators.required]],
      releaseID: ['', [Validators.required]],
    });
  }

  addNewAmendment(): void {
    this.mostrarSpinner = true;
    this.addAmendment.emit(this.amendmentsForm);
    this.initForm();
    setTimeout(() => {
      this.mostrarSpinner = false;
      console.log('agregando al arreglo');
    }, 1000);
  }
}
