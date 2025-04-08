import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Institution } from '../models/institutions';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class InstitutionsService {
  private apiUrl = `${environment.BACKEND_API}/institution`;

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getHeaders(): HttpHeaders {
    const isAuth = this.auth.isAuth();
    const token = this.auth.getToken();

    return isAuth
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();
  }

  getInstitutions(): Observable<Institution[]> {
    return this.http.get<Institution[]>(this.apiUrl, {
      headers: this.getHeaders(),
    });
  }

  getInstitution(id: number): Observable<Institution> {
    return this.http.get<Institution>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  createInstitution(institution: Institution): Observable<Institution> {
    return this.http.post<Institution>(
      this.apiUrl,
      { data: institution },
      {
        headers: this.getHeaders(),
      }
    );
  }

  updateInstitution(
    id: string,
    institution: Institution
  ): Observable<Institution> {
    return this.http.put<Institution>(
      `${this.apiUrl}/${id}`,
      { data: institution },
      {
        headers: this.getHeaders(),
      }
    );
  }

  deleteInstitution(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
