import { Currency, Guarantees, GuaranteeTypes } from 'src/utils';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService, IPartieList } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contracts-guarantees',
  templateUrl: './contracts-guarantees.component.html',
  styleUrls: ['./contracts-guarantees.component.css'],
})
export class ContractsGuaranteesComponent implements OnInit {
  @Input() guaranteesArray: Array<any> = [];
  @Output() addGuarante = new EventEmitter<any>();
  @Output() deleteGuarante = new EventEmitter<any>();

  guaranteesForm!: FormGroup;
  record_id = null;
  currency = Currency;
  guarantor: any = [];

  guarantees = Guarantees;
  guaranteeTypes = GuaranteeTypes;
  mostrarSpinner = false;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  getPartiesListTitle(roles: Array<string>): string {
    return this.api.getPartiesListTitle(roles);
  }

  addNewGuarante(): void {
    const nuevaGarantia = this.guaranteesForm.value;
  
    const yaExiste = this.guaranteesArray.some(
      (g: any) =>
        g.type === nuevaGarantia.type &&
        g.obligations === nuevaGarantia.obligations &&
        g.value.amount === nuevaGarantia.value.amount &&
        g.guarantor === nuevaGarantia.guarantor
    );
  
    if (yaExiste) {
      Swal.fire({
        icon: 'warning',
        title: 'Garantía duplicada',
        text: 'Esta garantía ya ha sido agregada.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#ffc107',
      });
      return;
    }
  
    this.mostrarSpinner = true;
    this.addGuarante.emit(this.guaranteesForm);
    this.initForm();
  
    setTimeout(() => {
      this.mostrarSpinner = false;
      console.log('agregando al arreglo');
    }, 1000);
  }
  

  confirmAndDeleteGuarante(index: number): void {
    Swal.fire({
      text: '¿Deseas eliminar este garantía?',
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
        this.deleteGuarante.emit(index);
      }
    });
  }

  getGuaranteeDesc(code: string): string {
    const guarantee = this.guarantees.find((g) => g.code === code);
    return guarantee ? guarantee.description : '';
  }

  getGuaranteeTypeDesc(code: string): string {
    const guaranteeType = this.guaranteeTypes.find((g) => g.code === code);
    return guaranteeType ? guaranteeType.description : '';
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
    });

    if (this.record_id) {
      this.api.getPartiesByType(this.record_id).subscribe((d: IPartieList) => {
        this.guarantor = d.data;
      });
    }

    this.initForm();
  }

  initForm(): void {
    this.guaranteesForm = this.fb.group({
      type: ['', [Validators.required]],
      date: ['', [Validators.required]],
      obligations: ['', [Validators.required]],
      value: this.fb.group({
        amount: ['0', [Validators.required]],
        currency: ['MXN', [Validators.required]],
      }),
      guarantor: ['', [Validators.required]],
      period: this.fb.group({
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]],
        durationInDays: ['', [Validators.required]],
        maxExtentDate: ['', [Validators.required]],
      }),
    });
  }
}
