import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService, IPartieList } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

interface IPartie {
  id: number;
  name: string;
}

@Component({
  selector: 'app-awards-suppliers',
  templateUrl: './awards-suppliers.component.html',
  styleUrls: ['./awards-suppliers.component.css'],
})
export class AwardsSuppliersComponent {
  @Input() suppliersArray: Array<any> = [];
  @Output() addSupplier = new EventEmitter<any>();
  @Output() deleteSupplier = new EventEmitter<any>();

  record_id: string = '';

  suppliersValue!: IPartie;
  suppliers: any = [];

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute
  ) {}

  getPartiesListTitle(roles: Array<string>): string {
    return this.api.getPartiesListTitle(roles);
  }

  loadData(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
    });
    this.api.getMethod(`/awards/${this.record_id}`).subscribe((d: any) => {
      const { awards, error, message } = d;
      if (error) {
        console.log('error: ', error);
        console.log('message: ', message);
      } else {
        if (awards && awards.suppliers) {
          this.loadForm(awards.suppliers);
        } else {
          console.log('No suppliers data available');
        }
      }
    });
  }

  loadForm(data: any[]): void {
    if (Array.isArray(data)) {
      data.forEach((supplier: any) => {
        this.addSupplier.emit({ ...supplier });
      });
    } else {
      console.log('Invalid suppliers data');
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
    });
    if (this.record_id) {
      this.api
        .getPartiesByType(this.record_id, 'supplier')
        .subscribe((d: IPartieList) => {
          this.suppliers = d.data;
        });
    }
    this.loadData();
  }

  addNewSupplier(): void {
    if (this.suppliers.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'Sin proveedores',
        text: 'No existen proveedores registrados en la sección de "Actores".',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#0d6efd',
      });
      return;
    }
    if (!this.suppliersValue) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe seleccionar un proveedor para agregarlo.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#dc3545',
      });
      return;
    }
    this.addSupplier.emit(this.suppliersValue);
    //console.log(this.suppliersValue);
  }
}
