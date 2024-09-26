import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MilestoneStatus, MilestoneType } from 'src/utils';

@Component({
  selector: 'app-tender-milestones',
  templateUrl: './tender-milestones.component.html',
  styleUrls: ['./tender-milestones.component.css'],
})
export class TenderMilestonesComponent implements OnInit {
  @Input() milestonesArray: Array<any> = [];
  @Output() addMilestone = new EventEmitter<any>();
  @Output() deleteMilestone = new EventEmitter<any>();

  milestoneType = MilestoneType;
  milestoneStatus = MilestoneStatus;

  milestoneForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  getMilestoneTypeDesc(code: string): string {
    let desc = '';
    this.milestoneType.forEach((m) => {
      if (m.code === code) desc = m.title;
    });
    return desc;
  }

  getMilestoneStatusDesc(code: string): string {
    let desc = '';
    this.milestoneStatus.forEach((m) => {
      if (m.code === code) desc = m.title;
    });
    return desc;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.milestoneForm = this.fb.group({
      title: ['', [Validators.required]],
      type: ['', [Validators.required]],
      description: ['', [Validators.required]],
      code: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
      dateMet: ['', [Validators.required]],
      dateModified: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
  }

  addNewMilestone(): void {
    console.log('this.milestoneForm.value: ', this.milestoneForm.value);
    this.addMilestone.emit(this.milestoneForm);
    this.initForm();
  }
}
