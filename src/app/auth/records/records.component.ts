import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

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
