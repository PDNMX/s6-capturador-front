import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import OrganizationSchemes from 'src/utils/organizationsSchemes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-additional-identifiers-section',
  templateUrl: './additional-identifiers-section.component.html',
  styleUrls: ['./additional-identifiers-section.component.css'],
})
export class AdditionalIdentifiersSectionComponent implements OnInit {
  @Input() additionalIdentifiersArray: Array<any> = [];
  @Output() addAdditionalIdentifier = new EventEmitter<any>();
  @Output() deleteAdditionalIdentifier = new EventEmitter<number>();

  additionalIdentifiersForm!: FormGroup;

  organizationSchemes = OrganizationSchemes.filter(
    (scheme) => !scheme.deprecated
  );

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initAdditionalIdentifiersForm();
  }

  // Getters para controles del formulario
  get add_schema(): FormControl {
    return this.additionalIdentifiersForm.get('schema') as FormControl;
  }

  get add_id(): FormControl {
    return this.additionalIdentifiersForm.get('id') as FormControl;
  }

  get add_uri(): FormControl {
    return this.additionalIdentifiersForm.get('uri') as FormControl;
  }

  get add_legalName(): FormControl {
    return this.additionalIdentifiersForm.get('legalName') as FormControl;
  }

  // Inicializar formulario de identificadores adicionales
  initAdditionalIdentifiersForm(): void {
    this.additionalIdentifiersForm = this.fb.group({
      schema: ['', [Validators.required]],
      id: ['', [Validators.required]],
      uri: [''],
      legalName: ['', [Validators.required]],
    });

    // Listener para el cambio de schema que actualiza automáticamente la URI
    this.additionalIdentifiersForm
      .get('schema')
      ?.valueChanges.subscribe((schemaCode) => {
        const selectedScheme = this.organizationSchemes.find(
          (scheme) => scheme.code === schemaCode
        );
        if (selectedScheme) {
          this.additionalIdentifiersForm
            .get('uri')
            ?.setValue(selectedScheme.url);
        }
      });
  }

  // Agregar nuevo identificador adicional
  addAdditionalIdentifiers(): void {
    if (!this.additionalIdentifiersForm.valid) {
      this.additionalIdentifiersForm.markAllAsTouched();
      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        text: 'Por favor, complete todos los campos requeridos.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#ffc107',
      });
      return;
    }

    // Validar duplicados
    const newIdentifier = this.additionalIdentifiersForm.value;
    const isDuplicate = this.additionalIdentifiersArray.some(
      (existing) => 
        existing.schema === newIdentifier.schema && 
        existing.id === newIdentifier.id
    );

    if (isDuplicate) {
      Swal.fire({
        icon: 'warning',
        title: 'Identificador duplicado',
        text: 'Ya existe un identificador con el mismo esquema e ID.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#ffc107',
      });
      return;
    }

    // Emitir el nuevo identificador
    this.addAdditionalIdentifier.emit(this.additionalIdentifiersForm);
    
    // Reiniciar formulario
    this.initAdditionalIdentifiersForm();
    
    Swal.fire({
      icon: 'success',
      title: 'Identificador agregado',
      text: 'El identificador adicional ha sido agregado exitosamente.',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#28a745',
      timer: 2000,
      timerProgressBar: true
    });
  }

  // Confirmar y eliminar identificador
  confirmAndDeleteIdentifier(index: number): void {
    Swal.fire({
      text: '¿Deseas eliminar este identificador adicional?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteAdditionalIdentifier.emit(index);
        
        Swal.fire({
          text: 'El identificador ha sido eliminado.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          timer: 2000,
          timerProgressBar: true
        });
      }
    });
  }
}