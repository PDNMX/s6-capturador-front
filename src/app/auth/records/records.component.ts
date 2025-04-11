import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css'],
})
export class RecordsComponent implements OnInit {
  records: any = [];
  constructor(private api: ApiService, private router: Router) {}

  get randomNumber(): number {
    return Math.floor(Math.random() * 10) + 1;
  }

  getAllRecords() {
    this.api.getMethod('/records').subscribe((r: any) => {
      this.records = r.results;
    });
  }

  ngOnInit(): void {
    this.getAllRecords();
    localStorage.removeItem('record');
  }

  confirmAndDeleteRecord(id: string, recordName?: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Realmente deseas eliminar ${recordName ? 'el registro "' + recordName + '"' : 'este registro'}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          //title: 'Eliminado!',
          text: 'El registro ha sido eliminado.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        })
        this.deleteRecord(id);
      }
    });
  }

  deleteRecord(id: string): void {
    this.api.deleteMethod(id, `/records/${id}`).subscribe((r: any) => {
      if (r.err) {
        console.log('r: ', r);
      } else {
        this.getAllRecords();
      }
    });
  }

  addRecord(): void {
    this.api.postMethod({}, '/records').subscribe((r: any) => {
      if (r.err) {
        console.log('r: ', r);
      } else {
        const id = r.data._id;
        localStorage.setItem('record', id);
        this.router.navigate([`/planning/${id}`]);
      }
    });
  }

  editRecord(id: string): void {
    localStorage.setItem('record', id);
    this.router.navigate([`/planning/${id}`]);
  }
}
