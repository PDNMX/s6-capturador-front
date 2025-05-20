import { map } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormControlDirective,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Classifications, Currency } from 'src/utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tender-items',
  templateUrl: './tender-items.component.html',
  styleUrls: ['./tender-items.component.css'],
})
export class TenderItemsComponent implements OnInit {
  @Input() itemsArray: Array<any> = [];
  @Output() addItem = new EventEmitter<any>();
  @Output() deleteItem = new EventEmitter<any>();

  record_id = null;
  itemsForm!: FormGroup;
  additionalClassificationsForm!: FormGroup;

  classification = Classifications.map((m) => ({
    id: m.id,
    description: m.description,
    uri: m.uri,
  }));
  currency = Currency;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  get additionalClassificationsArray() {
    return this.itemsForm.controls['additionalClassifications'] as FormArray;
  }

  addAdditionalClassifications(): void {
    const data = this.additionalClassificationsForm.value.data;
    const { id, description, uri } = data;

    if (!data) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe seleccionar una clasificación adicional para agregarla.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#dc3545',
      });
      return;
    }

    const yaExiste = this.additionalClassificationsArray.value.some(
      (item: any) => item.id === id
    );

    if (yaExiste) {
      Swal.fire({
        icon: 'warning',
        title: 'Clasificación duplicada',
        text: 'Esta clasificación adicional ya ha sido agregada.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#ffc107',
      });
      return;
    }

    this.additionalClassificationsArray.push(
      this.fb.group({
        id: [id, Validators.required],
        description: [description, Validators.required],
        uri: [uri, Validators.required],
      })
    );

    this.additionalClassificationsForm.reset();
  }

  deleteAdditionalClassifications(index: number): void {
    this.additionalClassificationsArray.removeAt(index);
  }

  loadForm(data: any): void {
    data.forEach((item: any) => {
      const {
        id,
        description,
        classification,
        additionalClassifications,
        quantity,
        unit,
      } = item;

      this.addItem.emit(
        this.fb.group({
          id,
          description,
          classification,
          additionalClassifications: this.fb.array(
            additionalClassifications.map((m: any) => this.fb.group({ ...m }))
          ),
          quantity,
          unit,
        })
      );

      this.itemsArray.push(this.itemsForm);
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
        if (tender !== null) this.loadForm(tender.items);
      }
    });
  }

  ngOnInit(): void {
    this.initForm();
    this.loadData();
  }

  initForm(): void {
    this.itemsForm = this.fb.group({
      description: ['', [Validators.required]],
      classification: ['', [Validators.required]],
      additionalClassifications: this.fb.array([]),
      quantity: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      unit: this.fb.group({
        name: ['', [Validators.required]],
        value: this.fb.group({
          amount: ['', [Validators.required]],
          netAmount: ['', [Validators.required]],
          currency: ['MXN', [Validators.required]],
        }),
      }),
    });

    this.additionalClassificationsForm = this.fb.group({
      data: [null, [Validators.required]],
    });
  }

  get description() {
    return this.itemsForm.get('description') as FormControl;
  }
  get classificationList() {
    return this.itemsForm.get('classification') as FormControl;
  }
  get quantity() {
    return this.itemsForm.get('quantity') as FormControl;
  }
  get name() {
    return this.itemsForm.get('unit')?.get('name') as FormControl;
  }
  get amount() {
    return this.itemsForm
      .get('unit')
      ?.get('value')
      ?.get('amount') as FormControl;
  }
  get netAmount() {
    return this.itemsForm
      .get('unit')
      ?.get('value')
      ?.get('netAmount') as FormControl;
  }

  selectChange(): void {
    this.itemsForm.controls['unit'].patchValue({
      name: this.itemsForm.value.classification.unit,
    });
  }

  enableAddItemButton(): boolean {
    return this.itemsForm.valid;
  }

  addNewItem(): void {
    this.addItem.emit(this.itemsForm);
    this.initForm();
  }
  confirmAndDeleteItem(index: number): void {
    Swal.fire({
      text: '¿Deseas eliminar este artículo?',
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
        this.deleteItem.emit(index);
      }
    });
  }
}
