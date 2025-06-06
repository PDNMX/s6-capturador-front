import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MilestoneStatus, MilestoneType } from 'src/utils';

@Component({
  selector: 'app-planning-milestones',
  templateUrl: './planning-milestones.component.html',
  styleUrls: ['./planning-milestones.component.css'],
})
export class PlanningMilestonesComponent implements OnInit {
  @Input() milestonesArray: Array<any> = [];
  @Output() addMilestone = new EventEmitter<any>();
  @Output() deleteMilestone = new EventEmitter<any>();

  record_id = null;

  milestoneType = MilestoneType;
  milestoneStatus = MilestoneStatus;

  milestoneForm!: FormGroup;
  mostrarSpinner = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  getMilestoneTypeDesc(code: string): string {
    let desc = '';
    this.milestoneType.forEach((m) => {
      if (m.code === code) desc = m.description;
    });
    return desc;
  }

  getMilestoneStatusDesc(code: string): string {
    let desc = '';
    this.milestoneStatus.forEach((m) => {
      if (m.code === code) desc = m.description;
    });
    return desc;
  }

  loadForm(data: any): void {
    data.forEach((milestone: any) => {
      this.addMilestone.emit(this.fb.group({ ...milestone }));
    });
  }

  loadData(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
    });

    this.api.getMethod(`/planning/${this.record_id}`).subscribe((d: any) => {
      const { planning, error, message } = d;

      if (error) {
        console.log('message: ', message);
      } else {
        // load forms
        if (planning.milestones !== null) this.loadForm(planning.milestones);
      }
    });
  }

  ngOnInit(): void {
    this.initForm();
    this.loadData();
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
    this.mostrarSpinner = true;
    this.addMilestone.emit(this.milestoneForm);
    this.initForm();
    setTimeout(() => {
      this.mostrarSpinner = false;
      console.log('agregando al arreglo');
    }, 1000);
  }
}
