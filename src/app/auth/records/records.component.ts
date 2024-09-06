import { Component } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css'],
})
export class RecordsComponent {
  constructor(private api: ApiService) {}

  num = [0, 1, 2, 3];
  addRecord(): void {
    const records_data = this.api.getMethod('/records').subscribe((r: any) => {
      console.log('r: ', r);
    });
    console.log('records_data: ', records_data);
    console.log('agregar record');
  }
}
