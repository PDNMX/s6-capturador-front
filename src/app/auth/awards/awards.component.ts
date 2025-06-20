import { map } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.css'],
})
export class AwardsComponent implements OnInit {
  awardForm!: FormGroup;
  awardsForm!: FormGroup;
  record_id = null;

  editMode: boolean = false;

  isSaving: boolean = false;
  savingMessage: string = '';

  // Propiedades para manejar errores de validación
  validationErrors: string[] = [];
  sectionsWithErrors: { [key: string]: boolean } = {};

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute
  ) {}

  newAward(): void {
    this.editMode = true;
  }

  deleteAward(index: number): void {
    const awardsArray = this.awardsForm.get('awards') as FormArray;
    awardsArray.removeAt(index);
    this.saveData();
  }

  getAward(): string {
    return JSON.stringify(this.awardForm.value, undefined, 4);
  }

  get awardsArray() {
    return this.awardsForm.controls['awards'] as FormArray;
  }

  get suppliersArray() {
    return this.awardForm.controls['suppliers'] as FormArray;
  }

  addSupplier(opt: any): void {
    this.suppliersArray.push(this.fb.group({ ...opt }));
    this.clearSectionError('suppliers');
  }

  deleteSupplier(index: number): void {
    this.suppliersArray.removeAt(index);
  }

  saveGeneralDataForm(data: any): void {
    this.awardForm = this.fb.group({
      ...this.awardForm.controls,
      ...data,
    });
    this.clearSectionError('general');
  }

  get itemsArray() {
    return this.awardForm.controls['items'] as FormArray;
  }

  addItem(opt: any): void {
    this.itemsArray.push(opt);
    this.clearSectionError('items');
  }

  deleteItem(index: number): void {
    this.itemsArray.removeAt(index);
  }

  get documentsarray() {
    return this.awardForm.controls['documents'] as FormArray;
  }

  addDocument(opt: any): void {
    this.documentsarray.push(opt);
    this.clearSectionError('documents');
  }

  deleteDocument(index: number): void {
    this.documentsarray.removeAt(index);
  }

  get amendmentsarray() {
    return this.awardForm.controls['amendments'] as FormArray;
  }

  addAmendment(opt: any): void {
    this.amendmentsarray.push(opt);
    this.clearSectionError('amendments');
  }

  deleteAmendment(index: number): void {
    this.amendmentsarray.removeAt(index);
  }

  validateRequiredSections(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    this.sectionsWithErrors = {};

    // Validar Información General - verificar los campos específicos del formulario
    const requiredGeneralFields = ['id', 'status', 'title', 'description', 'rationale', 'date'];
    const hasGeneralData = requiredGeneralFields.every(field => {
      const control = this.awardForm.get(field);
      return control && control.value && control.value.toString().trim() !== '';
    });

    // Verificar también los campos anidados (value y contractPeriod)
    const valueGroup = this.awardForm.get('value');
    const hasValueData = valueGroup && 
      valueGroup.get('amount')?.value && 
      valueGroup.get('currency')?.value;

    const contractPeriodGroup = this.awardForm.get('contractPeriod');
    const hasContractPeriodData = contractPeriodGroup && 
      contractPeriodGroup.get('startDate')?.value && 
      contractPeriodGroup.get('endDate')?.value;
    
    if (!hasGeneralData || !hasValueData || !hasContractPeriodData) {
      errors.push('Información General');
      this.sectionsWithErrors['general'] = true;
    }

    const suppliers = this.suppliersArray;
    const validSuppliers = suppliers.length > 0 && suppliers.controls.every((ctrl) => ctrl.valid);
    if (!validSuppliers) {
      errors.push('Proveedores');
      this.sectionsWithErrors['suppliers'] = true;
    }

    const items = this.itemsArray;
    const validItems = items.length > 0 && items.controls.every((ctrl) => ctrl.valid);
    if (!validItems) {
      errors.push('Artículos');
      this.sectionsWithErrors['items'] = true;
    }

    const documents = this.documentsarray;
    const validDocuments = documents.length > 0 && documents.controls.every((ctrl) => ctrl.valid);
    if (!validDocuments) {
      errors.push('Documentos');
      this.sectionsWithErrors['documents'] = true;
    }

    const amendments = this.amendmentsarray;
    const validAmendments = amendments.length > 0 && amendments.controls.every((ctrl) => ctrl.valid);
    if (!validAmendments) {
      errors.push('Modificaciones');
      this.sectionsWithErrors['amendments'] = true;
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  clearSectionError(section: string): void {
    if (this.sectionsWithErrors[section]) {
      delete this.sectionsWithErrors[section];
      this.validationErrors = this.validationErrors.filter(error => {
        const sectionNames: { [key: string]: string } = {
          'general': 'Información General',
          'suppliers': 'Proveedores',
          'items': 'Artículos',
          'documents': 'Documentos',
          'amendments': 'Modificaciones'
        };
        return error !== sectionNames[section];
      });
    }
  }

  saveAward(): void {
    // Limpiar errores previos
    this.validationErrors = [];
    this.sectionsWithErrors = {};

    // Validar todas las secciones requeridas
    const validation = this.validateRequiredSections();

    if (!validation.isValid) {
      this.validationErrors = validation.errors;

      // Crear lista HTML para SweetAlert2
      const errorsList = validation.errors.map(error => `• ${error}`).join('<br>');
      
      const htmlContent = `
        <div style="text-align: left;">
          <strong style="color: #dc3545;">Secciones pendientes:</strong><br><br>
          <div style="color: #dc3545;">${errorsList}</div>
        </div>
      `;

      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        footer: 'Revisa cada pestaña y asegúrate de completar todos los campos obligatorios.',
        html: htmlContent,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#ffc107',
      });

      // Marcar como touched solo las secciones con errores
      if (this.sectionsWithErrors['general']) {
        this.awardForm.markAllAsTouched();
      }
      if (this.sectionsWithErrors['suppliers']) {
        this.suppliersArray.controls.forEach((ctrl) => ctrl.markAllAsTouched());
      }
      if (this.sectionsWithErrors['items']) {
        this.itemsArray.controls.forEach((ctrl) => ctrl.markAllAsTouched());
      }
      if (this.sectionsWithErrors['documents']) {
        this.documentsarray.controls.forEach((ctrl) => ctrl.markAllAsTouched());
      }
      if (this.sectionsWithErrors['amendments']) {
        this.amendmentsarray.controls.forEach((ctrl) => ctrl.markAllAsTouched());
      }

      return;
    }

    // Todo válido, proceder con el guardado
    const awards = this.awardsArray;
    awards.push(this.awardForm);
    this.saveData();

    // Mostrar mensaje de éxito
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'La adjudicación se ha guardado correctamente',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#28a745',
    });

    // Limpiar errores y resetear formulario
    this.validationErrors = [];
    this.sectionsWithErrors = {};
    this.initAwardForm();
    this.editMode = false;
  }
  
  cancelAward(): void {
    this.editMode = false;
    this.initAwardForm();
    // Limpiar errores al cancelar
    this.validationErrors = [];
    this.sectionsWithErrors = {};
  }

  loadData(): void {
    this.api.getMethod(`/awards/${this.record_id}`).subscribe({
      next: (d: any) => {
        const { awards, error, message } = d;
        if (error) {
          console.log('message: ', message);
        } else {
          if (Array.isArray(awards)) {
            this.awardsForm.setControl(
              'awards',
              this.fb.array(awards.map((award) => this.fb.group(award)))
            );
          } else {
            console.error('Awards is not an array:', awards);
            this.awardsForm.setControl('awards', this.fb.array([]));
          }
        }
      },
      error: (err) => {
        console.error('Error loading awards:', err);
        this.awardsForm.setControl('awards', this.fb.array([]));
      },
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
    });

    this.initForm();
    this.loadData();
  }

  initAwardForm(): void {
    this.awardForm = this.fb.group({
      id: ['', Validators.required],
      status: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      rationale: ['', Validators.required],
      date: ['', Validators.required],
      value: this.fb.group({
        amount: ['', Validators.required],
        currency: ['MXN', [Validators.required]],
      }),
      contractPeriod: this.fb.group({
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        maxExtentDate: [null],
        durationInDays: [null],
      }),
      suppliers: this.fb.array([], [Validators.required]),
      items: this.fb.array([], [Validators.required]),
      documents: this.fb.array([], [Validators.required]),
      amendments: this.fb.array([], [Validators.required]),
    });
  }

  initForm(): void {
    this.awardsForm = this.fb.group({
      awards: this.fb.array([]),
    });
    this.initAwardForm();
  }

  showSavingMessage() {
    this.isSaving = true;
    this.savingMessage = 'Guardando adjudicación...';
    setTimeout(() => {
      this.isSaving = false;
      this.savingMessage = '';
    }, 2000);
  }

  loadForm(data: any): void {
    console.log('data', data);
    data.forEach((award: any) => {
      this.awardsArray.push(this.fb.control(award));
    });
    console.log('load awardForm', this.awardForm.value);
  }

  saveData(): void {
    const awardsData = this.awardsForm.value.awards;
    this.api
      .postMethod({ awards: awardsData }, `/awards/${this.record_id}`)
      .subscribe({
        next: (r: any) => {
          console.log('Respuesta:', r);
          if (r.error) {
            console.error('Error:', r.message);
            this.savingMessage = 'Error: ' + r.message;
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: r.message,
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#dc3545',
            });
          } else {
            this.loadData(); // Recargar los datos después de guardar
            this.savingMessage = 'Datos guardados con éxito';
          }
        },
        error: (err) => {
          console.error('Error HTTP:', err);
          this.savingMessage = 'Error de conexión. Por favor, intente de nuevo.';
          Swal.fire({
            icon: 'error',
            title: 'Error de conexión',
            text: 'Por favor, intente de nuevo.',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#dc3545',
          });
        },
        complete: () => {
          this.isSaving = false;
        },
      });
  }

  confirmAndDeleteAward(index: number): void {
    Swal.fire({
      text: '¿Deseas eliminar esta adjudicación?',
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
        this.deleteAward(index);
      }
    });
  }
}