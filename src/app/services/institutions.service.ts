import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Institution } from '../models/institutions';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InstitutionsService {
  private apiUrl = `${environment.BACKEND_API}/institution`;

  constructor(private http: HttpClient) {}

  getInstitutions(): Observable<Institution[]> {
    return this.http.get<Institution[]>(this.apiUrl);
  }

  getInstitution(id: number): Observable<Institution> {
    return this.http.get<Institution>(`${this.apiUrl}/${id}`);
  }

  createInstitution(institution: Institution): Observable<Institution> {
    return this.http.post<Institution>(this.apiUrl, { data: institution });
  }

  updateInstitution(
    id: string,
    institution: Institution
  ): Observable<Institution> {
    return this.http.put<Institution>(`${this.apiUrl}/${id}`, {
      data: institution,
    });
  }

  deleteInstitution(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
