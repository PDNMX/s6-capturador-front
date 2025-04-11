import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService, IPartieList } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

interface IPartie {
  id: number;
  name: string;
}

@Component({
  selector: 'app-tender-tenderers',
  templateUrl: './tender-tenderers.component.html',
  styleUrls: ['./tender-tenderers.component.css'],
})
export class TenderTenderersComponent implements OnInit {
  @Input() tenderersArray: Array<any> = [];
  @Output() addTenderer = new EventEmitter<any>();
  @Output() deleteTenderer = new EventEmitter<any>();

  record_id = null;
  tenderersValue!: IPartie;

  tenderers: any = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  getPartiesListTitle(roles: Array<string>): string {
    return this.api.getPartiesListTitle(roles);
  }

  loadForm(data: any): void {
    data.forEach((tenderer: any) => {
      this.addTenderer.emit({ ...tenderer });
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
        if (tender !== null) this.loadForm(tender.tenderers);
      }
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
    });

    if (this.record_id) {
      this.api
        .getPartiesByType(this.record_id, 'tenderer')
        .subscribe((d: IPartieList) => {
          this.tenderers = d.data;
        });
    }

    this.loadData();
  }

  addNewTenderer(): void {
    if(this.tenderers.length === 0){
      Swal.fire({
        icon: 'info',
        title: 'Sin licitantes',
        text: 'No existen licitantes registrados en la sección de "Actores".',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#0d6efd',
      });
      return;
    }
    if (!this.tenderersValue) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe seleccionar un licitante para agregarlo.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#dc3545',
      });
      return;
    }
    this.addTenderer.emit(this.tenderersValue);
  }
}
