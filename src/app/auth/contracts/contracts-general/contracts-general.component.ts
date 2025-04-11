import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ContractStatus, Currency, RelatedProcesses } from 'src/utils';
import SurveillanceMechanismsType from 'src/utils/surveillanceMechanismsType';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

interface StoredMechanism {
  code: string;
  title: string;
}

interface StoredRelatedProcess {
  code: string;
  title: string;
  description: string;
}
@Component({
  selector: 'app-contracts-general',
  templateUrl: './contracts-general.component.html',
  styleUrls: ['./contracts-general.component.css'],
})
export class ContractsGeneralComponent implements OnInit {
  @Input() contractForm!: FormGroup;
  record_id = null;
  awardsForm: any; // Define la propiedad awardsForm
  awardIds: string[] = []; // Array para almacenar los IDs de los awards

  exchangeForm!: FormGroup;
  relatedProcessesForm!: FormGroup;
  relationshipValue: String = '';
  selectedMechanism: any = null;
  surveillanceMechanismsControl = new FormControl('');
  relatedProcessControl = new FormControl('');
  selectedRelatedProcess: any = null;

  contractStatus = ContractStatus;
  currency = Currency;
  relatedProcesses = RelatedProcesses;
  surveillanceMechanismsType = SurveillanceMechanismsType;

  mostrarSpinner = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
      this.loadData();
      //this.loadExistingData();
    });
    this.initExchangeForm();
    this.initRelatedProcessesForm();
    this.initSurveillanceMechanismsControl();
    this.initRelatedProcessControl();
  }

  loadData(): void {
    if (this.record_id) {
      this.api.getMethod(`/awards/${this.record_id}`).subscribe({
        next: (d: any) => {
          const { awards, error, message } = d;
          if (error) {
            console.log('message: ', message);
          } else {
            if (Array.isArray(awards)) {
              this.awardIds = awards.map((award: any) => award.id);
            } else {
              console.error('Awards is not an array:', awards);
            }
          }
        },
        error: (err) => {
          console.error('Error loading awards:', err);
        },
      });
    }
  }

  initSurveillanceMechanismsControl(): void {
    this.surveillanceMechanismsControl.valueChanges.subscribe((value) => {
      if (value) {
        this.selectedMechanism = this.surveillanceMechanismsType.find(
          (type) => type.code === value
        );
      }
    });
  }

  initRelatedProcessControl(): void {
    this.relatedProcessControl.valueChanges.subscribe((value) => {
      if (value) {
        this.selectedRelatedProcess = this.relatedProcesses.find(
          (type) => type.code === value
        );
      }
    });
  }

  //validaciones

  get contractId() {
    return this.contractForm.get('contractId') as FormControl;
  }
  get awardID() {
    return this.contractForm.get('awardID') as FormControl;
  }
  get title() {
    return this.contractForm.get('title') as FormControl;
  }
  get description() {
    return this.contractForm.get('description') as FormControl;
  }
  get status() {
    return this.contractForm.get('status') as FormControl;
  }
  get period() {
    return this.contractForm.get('period') as FormGroup;
  }
  getControl(name: string): FormControl {
    return this.period.get(name) as FormControl;
  }
  get amount() {
    return this.contractForm.get('value')?.get('amount') as FormControl;
  }
  get netAmount() {
    return this.contractForm.get('value')?.get('netAmount') as FormControl;
  }
  get dateSigned() {
    return this.contractForm.get('dateSigned') as FormControl;
  }

  getRelatedProcessesDesc(code: string): string {
    const process = this.relatedProcesses.find((p) => p.code === code);
    return process?.description || '';
  }

  getRelatedProcessTitle(code: string): string {
    const process = this.relatedProcesses.find((p) => p.code === code);
    return process ? process.title : code;
  }

  getSurveillanceMechanismTypeDesc(code: string): string {
    let desc = '';
    SurveillanceMechanismsType.forEach((type) => {
      if (type.code === code) desc = type.description;
    });
    return desc;
  }

  get exchangeRatesArray() {
    const value = this.contractForm.get('value');
    return value?.get('exchangeRates') as FormArray;
  }

  addExchangeRates(): void {
    this.exchangeRatesArray.push(this.exchangeForm);
    this.initExchangeForm();
  }

  deleteExchangeRates(index: number): void {
    this.exchangeRatesArray.removeAt(index);
  }

  get surveillanceMechanismsArray() {
    return this.contractForm.controls['surveillanceMechanisms'] as FormArray;
  }

  addSurveillanceMechanisms() {
    if (this.surveillanceMechanismsControl.value) {
      const selectedMechanism = this.surveillanceMechanismsType.find(
        (type) => type.code === this.surveillanceMechanismsControl.value
      );

      if (selectedMechanism) {
        this.surveillanceMechanismsArray.push(
          this.fb.control(selectedMechanism.code) // Guardamos el título en lugar del código
        );

        console.log('Array despues de agregar:', {
          surveillanceMechanisms: this.surveillanceMechanismsArray.value,
        });

        this.surveillanceMechanismsControl.reset();
        this.selectedMechanism = null;
      }
    }
  }

  getMechanismTitle(code: string): string {
    const mechanism = this.surveillanceMechanismsType.find(
      (type) => type.code === code
    );
    return mechanism ? mechanism.title : code;
  }

  deleteSurveillanceMechanisms(index: number) {
    this.surveillanceMechanismsArray.removeAt(index);
  }

  getContractStatusDesc(code: string): string {
    const ele = this.contractStatus.find((e) => e.code === code);
    return ele?.description || '';
  }

  get relatedProcessesArray() {
    return this.contractForm.controls['relatedProcesses'] as FormArray;
  }

  addRelatedProcesses(): void {
    this.mostrarSpinner = true;
    this.relatedProcessesArray.push(this.relatedProcessesForm);
    setTimeout(() => {
      this.mostrarSpinner = false;
      console.log('agregando al arreglo');
    }, 1000);
  }

  confirmAndDeleteRelatedProcesses(index: number): void {
    Swal.fire({
      text: '¿Deseas eliminar este proceso relacionado?',
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
        this.deleteRelatedProcesses(index);
      }
    });
  }

  deleteRelatedProcesses(index: number): void {
    this.relatedProcessesArray.removeAt(index);
  }

  get relationshipArray() {
    return this.relatedProcessesForm.controls['relationship'] as FormArray;
  }

  addRelationship(): void {
    if (this.relatedProcessControl.value) {
      this.relationshipArray.push(
        this.fb.control(this.relatedProcessControl.value)
      );
      console.log('Relación agregada:', {
        relationships: this.relationshipArray.value,
      });
      this.relatedProcessControl.reset();
      this.selectedRelatedProcess = null;
    }
  }

  deleteRelationship(index: number): void {
    this.relationshipArray.removeAt(index);
  }

  initExchangeForm(): void {
    this.exchangeForm = this.fb.group({
      rate: ['', [Validators.required]],
      currency: ['MXN', [Validators.required]],
      date: ['', [Validators.required]],
      source: ['', [Validators.required]],
    });
  }

  initRelatedProcessesForm(): void {
    this.relatedProcessesForm = this.fb.group({
      id: ['', [Validators.required]],
      relationship: this.fb.array([]),
      title: ['', [Validators.required]],
      scheme: ['', [Validators.required]],
      identifier: ['', [Validators.required]],
      uri: ['', [Validators.required]],
    });
  }
}
