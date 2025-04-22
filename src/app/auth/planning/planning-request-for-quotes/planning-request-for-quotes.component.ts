import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService, IPartieList } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-planning-request-for-quotes',
  templateUrl: './planning-request-for-quotes.component.html',
  styleUrls: ['./planning-request-for-quotes.component.css'],
})
export class PlanningRequestForQuotesComponent implements OnInit {
  @Input() requestForQuotesArray: Array<any> = [];
  @Output() addRequestForQuotes = new EventEmitter<any>();
  @Output() deleteRequestForQuotes = new EventEmitter<any>();

  @Output() saveRequestForQuotesData = new EventEmitter<any>();

  record_id = null;

  requestForQuotesForm!: FormGroup;
  selectForm!: FormGroup;

  invitedSuppliers: any = [];
  mostrarSpinner = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  get quotesArray() {
    return this.requestForQuotesForm.controls['quotes'] as FormArray;
  }

  getPartiesListTitle(roles: Array<string>): string {
    return this.api.getPartiesListTitle(roles);
  }

  addQuotes(opt: any) {
    this.quotesArray.push(opt);
  }
  deleteQuotes(index: number) {
    this.quotesArray.removeAt(index);
  }

  get invitedSuppliersArray() {
    return this.requestForQuotesForm.controls['invitedSuppliers'] as FormArray;
  }

  addInvitedSuppliers(): void {
    const selected = this.selectForm.value.invitedSuppliers;
  
    if (this.invitedSuppliers.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'Sin proveedores',
        text: 'No existen proveedores registrados en la sección de "Actores".',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#0d6efd',
      });
      return;
    }
  
    if (!selected) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe seleccionar un proveedor.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#dc3545',
      });
      return;
    }
  
    const yaExiste = this.invitedSuppliersArray.value.some(
      (p: any) => p?.id === selected?.id
    );
  
    if (yaExiste) {
      Swal.fire({
        icon: 'warning',
        title: 'Duplicado',
        text: 'Este proveedor ya ha sido agregado.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#ffc107',
      });
      return;
    }
  
    // Si no existe, se agrega
    this.invitedSuppliersArray.push(this.fb.control(selected));
    this.initSelectForm(); 
  }
  
  deleteInvitedSuppliers(index: number): void {
    this.invitedSuppliersArray.removeAt(index);
  }

  get itemsArray() {
    return this.requestForQuotesForm.controls['items'] as FormArray;
  }

  addItem(opt: any): void {
    this.itemsArray.push(opt);
  }

  deleteItem(index: number): void {
    this.itemsArray.removeAt(index);
  }

  setSelectValue(element: string, value: any): void {
    this.requestForQuotesForm.get(element)?.setValue(value);
  }

  loadData(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
    });

    this.api.getMethod(`/planning/${this.record_id}`).subscribe((d: any) => {
      const { planning, error, message } = d;
      console.log('planning: ', planning);

      if (error) {
        console.log('message: ', message);
      } else {
        // load forms
        if (planning !== null && planning.requestForQuotes !== null) {
          // this.loadForm(planning.requestForQuotes);
        }
      }
    });
  }

  ngOnInit(): void {
    this.initForm();

    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
    });

    if (this.record_id) {
      this.api.getPartiesByType(this.record_id).subscribe((d: IPartieList) => {
        this.invitedSuppliers = d.data;
      });
    }

    this.loadData();
  }

  get title(): FormControl {
    return this.requestForQuotesForm.get('title') as FormControl;
  }

  get description(): FormControl {
    return this.requestForQuotesForm.get('description') as FormControl;
  }

  get uri(): FormControl {
    return this.requestForQuotesForm.get('uri') as FormControl;
  }

  get period() {
    return this.requestForQuotesForm.get('period') as FormGroup;
  }
  getControl(name: string): FormControl {
    return this.period.get(name) as FormControl;
  }

  private dateComparisonValidator(): Validators {
    return (group: AbstractControl): ValidationErrors | null => {
      const startDate = group.get('startDate')?.value;
      const endDate = group.get('endDate')?.value;
      const maxExtentDate = group.get('maxExtentDate')?.value;

      if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
        group.get('endDate')?.setErrors({ dateInvalid: true });
        return { dateInvalid: true };
      }

      if (
        maxExtentDate &&
        endDate &&
        new Date(maxExtentDate) < new Date(endDate)
      ) {
        group.get('maxExtentDate')?.setErrors({ maxDateInvalid: true });
        return { maxDateInvalid: true };
      }

      return null;
    };
  }

  initForm(): void {
    this.requestForQuotesForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      period: this.fb.group(
        {
          startDate: ['', Validators.required],
          endDate: ['', Validators.required],
          maxExtentDate: ['', Validators.required],
          durationInDays: ['', Validators.required],
        },
        { validators: this.dateComparisonValidator() }
      ),
      items: this.fb.array([]),
      invitedSuppliers: this.fb.array([]),
      quotes: this.fb.array([]),
      uri: ['', Validators.required],
    });

    this.initSelectForm();
  }

  initSelectForm(): void {
    this.selectForm = this.fb.group({
      invitedSuppliers: ['', [Validators.required]],
    });
  }

  addNewRequestForQuotes(): void {
    this.mostrarSpinner = true;
    this.addRequestForQuotes.emit(this.requestForQuotesForm);
    console.log('this.requestForQuotesForm: ', this.requestForQuotesForm.value);
    this.initForm();
    setTimeout(() => {
      this.mostrarSpinner = false;
      console.log('agregando al arreglo');
    }, 1000);
  }
  confirmAndDeleteRequestForQuotes(index: number): void {
    Swal.fire({
      text: '¿Realmente deseas eliminar esta solicitud de cotización?',
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
        this.deleteRequestForQuotes.emit(index);
      }
    });
  }
}
