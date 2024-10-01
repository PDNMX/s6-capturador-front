import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MilestoneStatus, MilestoneType } from 'src/utils';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-implementation-milestones',
  templateUrl: './implementation-milestones.component.html',
  styleUrls: ['./implementation-milestones.component.css'],
})
export class ImplementationMilestonesComponent implements OnInit {
  @Input() milestonesArray: Array<any> = [];
  @Output() addMilestone = new EventEmitter<any>();
  @Output() deleteMilestone = new EventEmitter<any>();

  milestoneStatus = MilestoneStatus;
  milestoneType = MilestoneType;
  record_id = '';

  milestoneForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute
  ) {}

  loadForm(data: any): void {
    data.forEach((milestone: any) => {
      this.addMilestone.emit(this.fb.group({ ...milestone }));
    });
  }

  loadData(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
    });

    this.api.getMethod(`/implementation/${this.record_id}`).subscribe((d: any) => {
      const { implementation, error, message } = d;
      if (error) {
        console.log('message', message);
      } else {
        if (implementation !== null) this.loadForm(implementation.milestones);
      }
    });
  }

  getMilestoneTypeDesc(code: string): string {
    let desc = '';
    this.milestoneType.forEach((d) => {
      if (d.code === code) {
        desc = d.title;
      }
    });
    return desc;
  }

  getMilestoneStatusDesc(code: string): string {
    let desc = '';
    this.milestoneStatus.forEach((d) => {
      if (d.code === code) {
        desc = d.title;
      }
    });
    return desc;
  }

  ngOnInit(): void {
    this.initForm();
    this.loadData();
  }
  initForm(): void {
    this.milestoneForm = this.fb.group({
      title: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      code: ['', Validators.required],
      dueDate: ['', Validators.required],
      dateMet: ['', Validators.required],
      dateModified: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  addNewMilestone(): void {
    this.addMilestone.emit(this.milestoneForm);
    console.log(this.milestoneForm.value);
    this.initForm();
  }
}
