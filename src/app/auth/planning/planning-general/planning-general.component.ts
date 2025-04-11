import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService, IPartieList } from 'src/app/services/api.service';

import { Currency } from 'src/utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-planning-general',
  templateUrl: './planning-general.component.html',
  styleUrls: ['./planning-general.component.css'],
})
export class PlanningGeneralComponent implements OnInit {
  @Output() saveGeneralData = new EventEmitter<any>();

  record_id = null;

  currency = Currency;

  generalForm!: FormGroup;
  selectForm!: FormGroup;

  requestings: any = [];
  responsibles: any = [];
  contractings: any = [];

  requestingUnit = null;
  responsibleUnit = null;
  contractingUnit = null;

  isSaving: boolean = false;
  mostrarSpinner = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.initSelectForm();

    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
    });

    if (this.record_id) {
      this.api.getPartiesByType(this.record_id).subscribe((d: IPartieList) => {
        this.requestings = d.data;
        console.log('this.requestings: ', this.requestings);
      });
    }

    if (this.record_id) {
      this.api.getPartiesByType(this.record_id).subscribe((d: IPartieList) => {
        this.responsibles = d.data;
      });
    }

    if (this.record_id) {
      this.api.getPartiesByType(this.record_id).subscribe((d: IPartieList) => {
        this.contractings = d.data;
      });
    }

    this.loadData();
  }

  getPartiesListTitle(roles: Array<string>): string {
    return this.api.getPartiesListTitle(roles);
  }

  initForm(): void {
    this.generalForm = this.fb.group({
      rationale: ['', [Validators.required, Validators.maxLength(200)]],
      hasQuotes: ['', Validators.required],
      requestingUnits: this.fb.array([]),
      responsibleUnits: this.fb.array([]),
      contractingUnits: this.fb.array([]),
    });
  }

  get rationale() {
    return this.generalForm.get('rationale') as FormControl;
  }

  initSelectForm(): void {
    this.selectForm = this.fb.group({
      requestingUnits: ['', [Validators.required]],
      responsibleUnits: ['', [Validators.required]],
      contractingUnits: ['', [Validators.required]],
    });
  }

  // fin

  setSelectValue(element: string, value: any): void {
    this.generalForm.get(element)?.setValue(value);
  }

  loadForm(data: any): void {
    const {
      rationale,
      hasQuotes,
      contractingUnits,
      requestingUnits,
      responsibleUnits,
    } = data;

    this.generalForm.patchValue({
      rationale,
      hasQuotes,
      contractingUnits,
      requestingUnits,
      responsibleUnits,
    });

    contractingUnits.forEach((e: any) => {
      this.contractingUnitsFormArray.push(this.fb.group(e));
    });

    requestingUnits.forEach((e: any) => {
      this.requestingUnitsArray.push(this.fb.group(e));
    });

    responsibleUnits.forEach((e: any) => {
      this.responsibleUnitsArray.push(this.fb.group(e));
    });
  }

  loadData(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
      console.log('planning id: ', this.record_id);
    });

    this.api.getMethod(`/planning/${this.record_id}`).subscribe((r: any) => {
      const { planning, error, message } = r;
      if (error) {
        console.log('message: ', message);
      } else {
        //load forms
        if (planning !== null) this.loadForm(planning);
      }
    });
  }

  enableSaveFormButton(): boolean {
    return (
      this.generalForm.valid &&
      this.requestingUnitsArray.length !== 0 &&
      this.responsibleUnitsArray.length !== 0 &&
      this.contractingUnitsFormArray.length !== 0
    );
  }

  saveForm(): void {
    if (this.enableSaveFormButton()) {
      this.mostrarSpinner = true;
      this.saveGeneralData.emit(this.generalForm.controls);
      setTimeout(() => {
        this.mostrarSpinner = false;
        console.log('agregando al arreglo');
      }, 1000);
    }
  }

  get contractingUnitsFormArray() {
    return this.generalForm.controls['contractingUnits'] as FormArray;
  }

  addContractingUnits(): void {
    if (this.contractings.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'Sin unidades administrativas contratantes',
        text: 'No existen unidad administrativas contratantes registradas en la sección de "Actores".',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#0d6efd',
      });
      return;
    }
    if (!this.selectForm.value.contractingUnits) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe seleccionar una unidad administrativa contratante.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#dc3545',
      });
      return;
    }
    this.contractingUnitsFormArray.push(
      this.fb.control(this.selectForm.value.contractingUnits)
    );
    this.initSelectForm();
  }

  deleteContractingUnit(index: number): void {
    this.contractingUnitsFormArray.removeAt(index);
  }

  get requestingUnitsArray() {
    return this.generalForm.controls['requestingUnits'] as FormArray;
  }

  addRequestingUnit(): void {
    if (this.requestings.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'Sin unidades administrativas requirentes',
        text: 'No existen unidades administrativas requirentes registradas en la sección de "Actores".',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#0d6efd',
      });
      return;
    }
    if (!this.selectForm.value.requestingUnits) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe seleccionar una unidad administrativa requirente.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#dc3545',
      });
      return;
    }
    this.requestingUnitsArray.push(
      this.fb.control(this.selectForm.value.requestingUnits)
    );
    this.initSelectForm();
  }
  deleteRequestingUnit(index: number): void {
    this.requestingUnitsArray.removeAt(index);
  }

  get responsibleUnitsArray() {
    return this.generalForm.controls['responsibleUnits'] as FormArray;
  }

  addResponsibleUnit(): void {
    if (this.responsibles.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'Sin unidades administrativas responsables',
        text: 'No existen unidades administrativas responsables registradas en la sección de "Actores".',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#0d6efd',
      });
      return;
    }
    if (!this.selectForm.value.responsibleUnits) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe seleccionar una unidad administrativa responsable.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#dc3545',
      });
      return;
    }
    this.responsibleUnitsArray.push(
      this.fb.control(this.selectForm.value.responsibleUnits)
    );
    this.initSelectForm();
  }
  deleteResponsibleUnit(index: number): void {
    this.responsibleUnitsArray.removeAt(index);
  }
}
