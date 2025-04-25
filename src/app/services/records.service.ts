import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

interface IRecordQuery {
  page: number;
  pageSize: number;
  query: object;
}

interface RecordResult {
  ocid: number;
}

@Injectable({
  providedIn: 'root',
})
export class RecordsService {
  private apiUrl = `${environment.BACKEND_API}/records`;

  constructor(private http: HttpClient) {}

  // post query
  query({ page, pageSize, query }: IRecordQuery): Observable<RecordResult[]> {
    return this.http.post<RecordResult[]>(`${this.apiUrl}/query`, {
      page,
      pageSize,
      query,
    });
  }
}
