import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private base_url = environment.BACKEND_API;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) {}

  private getHeaders(): HttpHeaders {
    const isAuth = this.auth.isAuth();
    const token = this.auth.getToken();

    return isAuth
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();
  }

  /* Método para hacer llamadas por get all*/
  getMethod<T>(endpoint: string): Observable<T> {
    return this.http
      .get<T>(`${this.base_url}${endpoint}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError<T>('getMethod')));
  }

  /* Método para hacer llamadas por post */
  postMethod<T>(body: T, endpoint: string): Observable<T> {
    return this.http
      .post<T>(`${this.base_url}${endpoint}`, body, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError<T>('postMethod')));
  }

  /* Método para hacer llamadas por put */
  putMethod<T>(id: string, body: T, endpoint: string): Observable<T> {
    return this.http
      .put<T>(`${this.base_url}${endpoint}`, body, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError<T>('postMethod')));
  }

  /* Método para llamadas por delete */
  deleteMethod<T>(id: string, endpoint: string): Observable<T> {
    return this.http
      .delete<T>(`${this.base_url}${endpoint}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError<T>('postMethod')));
  }
  // Manejo de errores
  private handleError<T>(operation: string) {
    return (err: HttpErrorResponse): Observable<T> => {
      console.error('ERROR BACKEND', operation, err); // Log the error to the console

      if (err.error.message === 'El token ha expirado.') {
        alert('su sesion ha expirado');
        this.auth.logout();
        this.router.navigate(['/login']);
      }
      return of({
        error: true,
        message: `${err.error.code} - ${err.error.message}`,
      } as any);
    };
  }
}
