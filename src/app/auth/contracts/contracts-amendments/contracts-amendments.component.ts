import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

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
      date: ['', [Validators.required]],
      rationale: ['', [Validators.required]],
      description: ['', [Validators.required]],
      amendsReleaseID: [''],
      releaseID: [''],
    });
  }

  get date() {
    return this.amendmentsForm.get('date') as FormControl;
  }
  get rationale() {
    return this.amendmentsForm.get('rationale') as FormControl;
  }
  get description() {
    return this.amendmentsForm.get('description') as FormControl;
  }

  enableAddAmendmentButton(): boolean {
    return this.amendmentsForm.valid && this.amendmentsForm.dirty;
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
  confirmAndDeleteAmendment(index: number): void {
    Swal.fire({
      text: '¿Deseas eliminar esta modificación?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          text: 'El registro ha sido eliminado.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        })
        this.deleteAmendment.emit(index);
      }
    });
  }
}
