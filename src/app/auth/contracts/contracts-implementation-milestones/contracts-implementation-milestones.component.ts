import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
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
    }, { validators: this.dateComparisonValidator() });
  }

  get title() {
    return this.milestoneForm.get('title') as FormControl;
  }
  get type() {
    return this.milestoneForm.get('type') as FormControl;
  }
  get description() {
    return this.milestoneForm.get('description') as FormControl;
  }
  get code() {
    return this.milestoneForm.get('code') as FormControl;
  }
  get dueDate() {
    return this.milestoneForm.get('dueDate') as FormControl;
  }
  get dateMet() {
    return this.milestoneForm.get('dateMet') as FormControl;
  }
  get dateModified() {
    return this.milestoneForm.get('dateModified') as FormControl;
  }
  get status() {
    return this.milestoneForm.get('status') as FormControl;
  }

  private dateComparisonValidator(): (group: AbstractControl) => ValidationErrors | null {
      return (group: AbstractControl): ValidationErrors | null => {
        const dueDate = group.get('dueDate')?.value;
        const dateMetControl = group.get('dateMet');
        const dateModifiedControl = group.get('dateModified');
        const dateMet = dateMetControl?.value;
        const dateModified = dateModifiedControl?.value;
    
        let hasErrors = false;
    
        // Validar dateMet vs dueDate
        if (dueDate && dateMet && new Date(dateMet) < new Date(dueDate)) {
          const currentErrors = dateMetControl?.errors || {};
          dateMetControl?.setErrors({
            ...currentErrors,
            dateMetInvalid: true
          });
          hasErrors = true;
        } else if (dateMetControl?.errors) {
          const { dateMetInvalid, ...otherErrors } = dateMetControl.errors;
          dateMetControl.setErrors(
            Object.keys(otherErrors).length > 0 ? otherErrors : null
          );
        }
    
        // Validar dateModified vs dueDate y dateMet
        if (dateModified) {
          const dateModifiedTime = new Date(dateModified).getTime();
          const dueDateTime = dueDate ? new Date(dueDate).getTime() : null;
          const dateMetTime = dateMet ? new Date(dateMet).getTime() : null;
    
          if ((dueDateTime && dateModifiedTime < dueDateTime) || 
              (dateMetTime && dateModifiedTime < dateMetTime)) {
            const currentErrors = dateModifiedControl?.errors || {};
            dateModifiedControl?.setErrors({
              ...currentErrors,
              dateModifiedInvalid: true
            });
            hasErrors = true;
          } else if (dateModifiedControl?.errors) {
            const { dateModifiedInvalid, ...otherErrors } = dateModifiedControl.errors;
            dateModifiedControl.setErrors(
              Object.keys(otherErrors).length > 0 ? otherErrors : null
            );
          }
        }
    
        return hasErrors ? { dateValidation: true } : null;
      };
    }

    enableAddMilestoneButton(): boolean {
      return this.milestoneForm.valid && this.milestoneForm.dirty;
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
