import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { RecordsService } from 'src/app/services/records.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css'],
})
export class RecordsComponent implements OnInit {
  records: any = [];
  // constructor2(private api: ApiService, private router: Router) {}

  get randomNumber(): number {
    return Math.floor(Math.random() * 10) + 1;
  }

  getAllRecords() {
    this.api.getMethod('/records').subscribe((r: any) => {
      this.records = r.results;
    });
  }

  ngOnInit(): void {
    // this.getAllRecords();
    this.loadProcesos();
    localStorage.removeItem('record');
  }

  confirmAndDeleteRecord(id: string, recordName?: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Realmente deseas eliminar ${
        recordName ? 'el registro "' + recordName + '"' : 'este registro'
      }?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          //title: 'Eliminado!',
          text: 'El registro ha sido eliminado.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
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

  /**********************/
  @Input() id: string = 'pagination';
  // @Input() totalRecords: number = 100;
  // @Input() currentPage: number = 1;
  // @Input() pageSize: number = 10;
  // @Input() pageSizeOptions: number[] = [5, 10, 25, 50];
  // @Output() pageChange = new EventEmitter<number>();
  // @Output() pageSizeChange = new EventEmitter<number>();

  getTotalPages(): number {
    return Math.ceil(this.totalRecords / this.pageSize);
  }

  getPages(): number[] {
    const totalPages = this.getTotalPages();

    const start = this.currentPage < 7 ? 1 : this.currentPage - 6;

    return Array.from({ length: totalPages }, (_, i) => i + 1);

    // return Array.from(
    //   { length: totalPages > 7 ? totalPages : 7 },
    //   (_, i) => start + i
    // );
  }

  onPageChange2(page: number): void {
    if (page >= 1 && page <= this.getTotalPages()) {
      // this.pageChange.emit(page);
    }
  }

  onPageSizeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.pageSize = +selectElement.value;
    this.currentPage = 1;
    this.loadProcesos();

    // this.pageSizeChange.emit(+selectElement.value);
  }

  // recors table
  // @Input() procesos: any[] = [];
  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  onEdit(ocid: string): void {
    this.edit.emit(ocid);
  }

  onDelete(ocid: string): void {
    this.delete.emit(ocid);
  }

  searchForm!: FormGroup;
  procesos: any[] = [];
  totalRecords = 100;
  currentPage = 1;
  pageSize = 10;
  pageSizeOptions = [10, 50, 100, 200];
  tenderStatusOptions = [
    'planning',
    'planned',
    'active',
    'cancelled',
    'unsuccessful',
    'complete',
    'withdrawn',
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api: ApiService,
    private recordsAPI: RecordsService
  ) {
    this.loadForm();
  }

  loadForm(): void {
    this.searchForm = this.fb.group({
      ocid: [''],
      id_project: [''],
      title_project: [''],
    });
  }

  // ngOnInit(): void {
  //   this.loadProcesos();
  // }

  loadProcesos(): void {
    const filters = this.searchForm.value;
    console.log('filters: ', filters);

    this.recordsAPI
      .query({
        page: this.currentPage,
        pageSize: this.pageSize,
        query: filters,
      })
      .subscribe((r: any) => {
        this.totalRecords = r.pagination.totalRows;
        console.log('this.totalRecords: ', this.totalRecords);
        console.log('this.procesos: ', this.procesos);
        this.procesos = r.results;
        console.log('this.procesos: ', this.procesos);
      });
    // this.procesosService.getProcesos(filters, this.currentPage, this.pageSize).subscribe({
    //   next: (response: PagedResponse<ProcesoContratacion>) => {
    //     this.procesos = response.data;
    //     this.totalRecords = response.total;
    //   },
    //   error: (err) => {
    //     console.error('Error fetching procesos:', err);
    //   },
    // });
  }

  onSearch(): void {
    this.currentPage = 1;
    this.loadProcesos();
  }

  onClear(): void {
    this.loadForm();
    this.currentPage = 1;
    this.loadProcesos();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadProcesos();
  }

  onPageSizeChange2(pageSize: number): void {
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.loadProcesos();
  }

  editProceso(ocid: string): void {
    console.log(`Edit proceso with ocid: ${ocid}`);
  }

  deleteProceso(ocid: string): void {
    console.log(`Delete proceso with ocid: ${ocid}`);
  }
}
