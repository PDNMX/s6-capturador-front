import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MilestoneStatus, MilestoneType } from 'src/utils';

@Component({
  selector: 'app-tender-milestones',
  templateUrl: './tender-milestones.component.html',
  styleUrls: ['./tender-milestones.component.css'],
})
export class TenderMilestonesComponent implements OnInit {
  milestoneType = MilestoneType;
  milestoneStatus = MilestoneStatus;

  milestoneArray: Array<any> = [];
  milestoneForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

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

  addMilestone(): void {
    this.milestoneArray.push(this.milestoneForm.value);
    this.initForm();
  }

  deleteMilestone(index: number): void {
    this.milestoneArray = this.milestoneArray.filter((m, i) => i !== index);
  }
}
