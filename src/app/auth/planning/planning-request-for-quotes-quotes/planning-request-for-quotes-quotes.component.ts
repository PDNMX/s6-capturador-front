import { Currency } from 'src/utils';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService, IPartieList } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-planning-request-for-quotes-quotes',
  templateUrl: './planning-request-for-quotes-quotes.component.html',
  styleUrls: ['./planning-request-for-quotes-quotes.component.css'],
})
export class PlanningRequestForQuotesQuotesComponent implements OnInit {
  @Input() quotesArray: Array<any> = [];
  @Output() addQuotes = new EventEmitter<any>();
  @Output() deleteQuotes = new EventEmitter<any>();

  record_id = null;
  currency = Currency;
  quotesForm!: FormGroup;

  issuingSupplier: any = [];

  mostrarSpinner = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  getPartiesListTitle(roles: Array<string>): string {
    return this.api.getPartiesListTitle(roles);
  }

  get itemsArray() {
    return this.quotesForm.controls['items'] as FormArray;
  }

  addItem(opt: any): void {
    this.itemsArray.push(opt);
  }

  deleteItem(index: number): void {
    this.itemsArray.removeAt(index);
  }
  get period() {
    return this.quotesForm.get('period') as FormGroup;
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

  addNewQuotes(): void {
    this.mostrarSpinner = true;
    this.addQuotes.emit(this.quotesForm);
    console.log('this.quotesForm: ', this.quotesForm.value);
    setTimeout(() => {
      this.mostrarSpinner = false;
      console.log('agregando al arreglo');
    }, 1000);
  }

  confirmAndDeleteQuotes(index: number): void {
    Swal.fire({
      text: '¿Deseas eliminar esta cotización?',
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
        this.deleteQuotes.emit(index);
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
        this.issuingSupplier = d.data;
      });
    }
  }

  initForm(): void {
    this.quotesForm = this.fb.group({
      id: [null],
      description: [null],
      date: [null],
      items: this.fb.array([]),
      value: this.fb.group({
        amount: [0],
        currency: ['MXN'],
      }),
      period: this.fb.group({
        startDate: [null],
        endDate: [null],
        maxExtentDate: [null],
        durationInDays: [null],
      }, { validators: this.dateComparisonValidator() }),
      issuingSupplier: [null],
    });
  }
}
