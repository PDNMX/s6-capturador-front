import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { getRoleTitle } from 'src/utils/partyRole';

export interface IPartieList {
  data: [
    {
      id: String;
      name: String;
    }
  ];
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private base_url = environment.BACKEND_API;

  constructor(private http: HttpClient) {}

  getPartiesByType(id: string, type: string = ''): Observable<IPartieList> {
    return this.http
      .get<IPartieList>(`${this.base_url}/parties/${id}/list/${type}`)
      .pipe(catchError(this.handleError<IPartieList>('getPartiesByType')));
  }

  getPartiesListTitle(roles: Array<string>): string {
    return roles.map((r: string) => this.getPartiesTitle(r)).toString();
  }

  getPartiesTitle(code: string): string {
    return getRoleTitle(code);
  }

  getMethodById(id: string, endpoint: string): Observable<any> {
    return this.http
      .post<any>(`${this.base_url}${endpoint}`, { id: id })
      .pipe(catchError(this.handleError<any>('getMethodById')));
  }

  /* Método para hacer llamadas por get all*/
  getMethod<T>(endpoint: string): Observable<T> {
    return this.http
      .get<T>(`${this.base_url}${endpoint}`)
      .pipe(catchError(this.handleError<T>('getMethod')));
  }

  /* Método para hacer llamadas por post */
  postMethod<T>(body: T, endpoint: string): Observable<T> {
    return this.http
      .post<T>(`${this.base_url}${endpoint}`, body)
      .pipe(catchError(this.handleError<T>('postMethod')));
  }

  /* Método para hacer llamadas por put */
  putMethod<T>(id: string, body: T, endpoint: string): Observable<T> {
    return this.http
      .put<T>(`${this.base_url}${endpoint}`, body)
      .pipe(catchError(this.handleError<T>('putMethod')));
  }

  /* Método para llamadas por delete */
  deleteMethod<T>(id: string, endpoint: string): Observable<T> {
    return this.http
      .delete<T>(`${this.base_url}${endpoint}`)
      .pipe(catchError(this.handleError<T>('deleteMethod')));
  }

  // Manejo de errores
  private handleError<T>(operation: string) {
    return (err: HttpErrorResponse): Observable<T> => {
      console.error('ERROR BACKEND', operation, err); // Log the error to the console

      return of({
        error: true,
        message: `${err.error.code} - ${err.error.message}`,
      } as any);
    };
  }
}
