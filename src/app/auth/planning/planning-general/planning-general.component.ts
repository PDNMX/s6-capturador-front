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
      rationale: [null, [Validators.required, Validators.maxLength(200)]],
      hasQuotes: ['', [Validators.required]],
      requestingUnits: this.fb.array([]),
      responsibleUnits: this.fb.array([]),
      contractingUnits: this.fb.array([]),
    });
  }

  get rationale() {
    return this.generalForm.get('rationale') as FormControl;
  }
  get hasQuotes() {
    return this.generalForm.get('hasQuotes') as FormControl;
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
    this.generalForm.markAllAsTouched();
    if (this.generalForm.invalid) {
      const htmlContent = `
      <p>Hay campos obligatorios sin llenar.</p>
      <ul style="text-align: left;">
        <li>Revisa los campos marcados en rojo.</li>
        <li>Los mensajes de error están debajo de cada campo.</li>
      </ul>
    `;

      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        html: htmlContent,
        footer:
          'Revisa cada campo obligatorio y asegúrate de completar la información.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#ffc107',
      });

      return;
    }
    if (this.enableSaveFormButton()) {
      this.saveGeneralData.emit(this.generalForm);
      Swal.fire({
        icon: 'success',
        title: 'Información guardada',
        text: 'La información general ha sido guardada exitosamente.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#28a745',
        timer: 2000,
        timerProgressBar: true,
      });
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

    const nuevaUnidad = this.selectForm.value.contractingUnits;
    const yaExiste = this.contractingUnitsFormArray.value.includes(nuevaUnidad);

    if (yaExiste) {
      Swal.fire({
        icon: 'warning',
        title: 'Unidad duplicada',
        text: 'La unidad administrativa contratante ya fue agregada.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#ffc107',
      });
      return;
    }

    this.contractingUnitsFormArray.push(this.fb.control(nuevaUnidad));
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

    const nuevaUnidad = this.selectForm.value.requestingUnits;
    const yaExiste = this.requestingUnitsArray.value.includes(nuevaUnidad);

    if (yaExiste) {
      Swal.fire({
        icon: 'warning',
        title: 'Unidad duplicada',
        text: 'La unidad administrativa requirente ya fue agregada.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#ffc107',
      });
      return;
    }

    this.requestingUnitsArray.push(this.fb.control(nuevaUnidad));
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

    const nuevaUnidad = this.selectForm.value.responsibleUnits;
    const yaExiste = this.responsibleUnitsArray.value.includes(nuevaUnidad);

    if (yaExiste) {
      Swal.fire({
        icon: 'warning',
        title: 'Unidad duplicada',
        text: 'La unidad administrativa responsable ya fue agregada.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#ffc107',
      });
      return;
    }

    this.responsibleUnitsArray.push(this.fb.control(nuevaUnidad));
    this.initSelectForm();
  }

  deleteResponsibleUnit(index: number): void {
    this.responsibleUnitsArray.removeAt(index);
  }
}
