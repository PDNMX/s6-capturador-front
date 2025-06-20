import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { Classifications, Currency } from 'src/utils';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-awards-items',
  templateUrl: './awards-items.component.html',
  styleUrls: ['./awards-items.component.css'],
})
export class AwardsItemsComponent implements OnInit {
  @Input() itemsArray: Array<any> = [];
  @Output() addItem = new EventEmitter<any>();
  @Output() deleteItem = new EventEmitter<any>();

  itemsForm!: FormGroup;
  additionalClassificationsForm!: FormGroup;

  record_id: string = '';

  data_classification = Classifications.map((m) => ({
    id: m.id,
    description: m.description,
    uri: m.uri,
  }));
  data_currency = Currency;
  mostrarSpinner = false;
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute
  ) {}
  /* loadForm(data: any): void {
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
 */
  /* loadData(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
    });

    this.api.getMethod(`/awards/${this.record_id}`).subscribe((d: any) => {
      const { awards, error, message } = d;

      if (error) {
        console.log('message: ', message);
      } else {
        // load forms
        if (awards !== null) this.loadForm(awards.items);
      }
    });
  } */

  get additionalClassificationsArray() {
    return this.itemsForm.controls['additionalClassifications'] as FormArray;
  }

  addAdditionalClassifications(): void {
    const data = this.additionalClassificationsForm.value.data;
    const { id, description, uri } = data;
  
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
        id: [id],
        description: [description],
        uri: [uri],
      })
    );
  
    this.additionalClassificationsForm.reset(); // Limpiar después de agregar
  }
  

  deleteAdditionalClassifications(index: number): void {
    this.additionalClassificationsArray.removeAt(index);
  }

  ngOnInit(): void {
    this.initForm();
    //this.loadData();
  }

  get description(): FormControl {
    return this.itemsForm.get('description') as FormControl;
  }

  get classification(): FormControl {
    return this.itemsForm.get('classification') as FormControl;
  }

  get quantity(): FormControl {
    return this.itemsForm.get('quantity') as FormControl;
  }

  get unit(): FormGroup {
    return this.itemsForm.get('unit') as FormGroup;
  }

  get name(): FormControl {
    return this.unit.get('name') as FormControl;
  }

  get value(): FormGroup {
    return this.unit.get('value') as FormGroup;
  }

  get amount(): FormControl {
    return this.value.get('amount') as FormControl;
  }

  get currency(): FormControl {
    return this.value.get('currency') as FormControl;
  }

  initForm(): void {
    this.itemsForm = this.fb.group({
      description: ['', [Validators.required]],
      classification: [null, [Validators.required]],
      additionalClassifications: this.fb.array([]),
      quantity: ['', [Validators.required]],
      unit: this.fb.group({
        name: ['', [Validators.required]],
        value: this.fb.group({
          amount: ['', [Validators.required]],
          currency: ['MXN', [Validators.required]],
        }),
      }),
    });

    this.additionalClassificationsForm = this.fb.group({
      data: [null],
    });
  }
  selectChange(): void {
    this.itemsForm.controls['unit'].patchValue({
      name: this.itemsForm.value.classification.unit,
    });
  }

  addNewItem(): void {
    this.mostrarSpinner = true;
    this.addItem.emit(this.itemsForm);
    //console.log(this.itemsForm.value);
    this.initForm();
    setTimeout(() => {
      this.mostrarSpinner = false;
      console.log('agregando al arreglo');
    }, 1000);
  }
  confirmAndDeleteItem(index: number): void {
    Swal.fire({
      text: '¿Deseas eliminar este artículo?',
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
        this.deleteItem.emit(index);
      }
    });
  }
}
