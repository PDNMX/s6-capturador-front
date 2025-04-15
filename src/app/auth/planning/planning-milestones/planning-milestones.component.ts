import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MilestoneStatus, MilestoneType } from 'src/utils';
import Swal from 'sweetalert2';

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
        if (planning !== null && planning.milestones !== null)
          this.loadForm(planning.milestones);
      }
    });
  }

  ngOnInit(): void {
    this.initForm();
    this.loadData();
  }

  get title(): FormControl {
    return this.milestoneForm.get('title') as FormControl;
  }
  get type(): FormControl {
    return this.milestoneForm.get('type') as FormControl;
  }
  get description(): FormControl {
    return this.milestoneForm.get('description') as FormControl;
  }
  get code(): FormControl {
    return this.milestoneForm.get('code') as FormControl;
  }
  get dueDate(): FormControl {
    return this.milestoneForm.get('dueDate') as FormControl;
  }
  get dateMet(): FormControl {
    return this.milestoneForm.get('dateMet') as FormControl;
  }
  get dateModified(): FormControl {
    return this.milestoneForm.get('dateModified') as FormControl;
  }
  get status(): FormControl {
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
              dateModifiedInvalidMilestone: true
            });
            hasErrors = true;
          } else if (dateModifiedControl?.errors) {
            const { dateModifiedInvalidMilestone, ...otherErrors } = dateModifiedControl.errors;
            dateModifiedControl.setErrors(
              Object.keys(otherErrors).length > 0 ? otherErrors : null
            );
          }
        }
    
        return hasErrors ? { dateValidation: true } : null;
      };
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
    }, { validators: this.dateComparisonValidator() });
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
  confirmAndDeleteMilestone(index: number): void {
    Swal.fire({
      text: '¿Deseas eliminar este hito?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          text: 'El registro ha sido eliminado.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        this.deleteMilestone.emit(index);
      }
    });
  }
}
