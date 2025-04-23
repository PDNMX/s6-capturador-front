import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
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

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getHeaders(): HttpHeaders {
    const isAuth = this.auth.isAuth();
    const token = this.auth.getToken();

    return isAuth
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();
  }

  // post query
  query({ page, pageSize, query }: IRecordQuery): Observable<RecordResult[]> {
    return this.http.post<RecordResult[]>(
      `${this.apiUrl}/query`,
      { page, pageSize, query },
      { headers: this.getHeaders() }
    );
  }
}
