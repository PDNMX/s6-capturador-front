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
  mostrarSpinner = false;
  getMilestoneTypeDesc(code: string): string {
    let desc = '';
    this.milestoneType.forEach((d) => {
      if (d?.code === code) {
        desc = d?.description;
      }
    });
    return desc;
  }

  getMilestoneStatusDesc(code: string): string {
    let desc = '';
    this.milestoneStatus.forEach((d) => {
      if (d.code === code) {
        desc = d.description;
      }
    });
    return desc;
  }

  ngOnInit(): void {
    this.initForm();
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
    this.mostrarSpinner = true;
    this.addMilestone.emit(this.milestoneForm);
    this.initForm();
    setTimeout(() => {
      this.mostrarSpinner = false;
      console.log('agregando al arreglo');
    }, 1000);
  }
}
