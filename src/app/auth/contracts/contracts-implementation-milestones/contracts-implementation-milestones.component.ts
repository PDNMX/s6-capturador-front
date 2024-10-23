import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MilestoneStatus, MilestoneType } from 'src/utils';
@Component({
  selector: 'app-contracts-implementation-milestones',
  templateUrl: './contracts-implementation-milestones.component.html',
  styleUrls: ['./contracts-implementation-milestones.component.css'],
})
export class ContractsImplementationMilestonesComponent {
  @Input() milestonesArray: Array<any> = [];
  @Output() addMilestone = new EventEmitter<any>();
  @Output() deleteMilestone = new EventEmitter<any>();

  milestoneStatus = MilestoneStatus;
  milestoneType = MilestoneType;

  milestoneForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  getMilestoneTypeDesc(code: string): string {
    let desc = '';
    this.milestoneType.forEach((d) => {
      if (d?.code === code) {
        desc = d?.title;
      }
    });
    return desc;
  }

  getMilestoneStatusDesc(code: string): string {
    let desc = '';
    this.milestoneStatus.forEach((d) => {
      if (d?.code === code) {
        desc = d?.title;
      }
    });
    return desc;
  }

  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void {
    this.milestoneForm = this.fb.group({
      title: ['title', Validators.required],
      type: ['type', Validators.required],
      description: ['description', Validators.required],
      code: ['code', Validators.required],
      dueDate: ['dueDate', Validators.required],
      dateMet: ['dateMet', Validators.required],
      dateModified: ['dateModified', Validators.required],
      status: ['status', Validators.required],
    });
  }

  addNewMilestone(): void {
    this.addMilestone.emit(this.milestoneForm);
    this.initForm();
  }
}
