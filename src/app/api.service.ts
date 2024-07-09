import { BrowserModule } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Contract } from './auth/contracts/contract.model'; // Importa la interfaz

@Injectable({
  providedIn: 'root'
})
export class ApiService {

   constructor(private http: HttpClient) { }

  //private base_url = 'https://httpbin.org'; //'172.20.30.75:4004/back/'//http://localhost:4200/contracts
    //private base_url = 'https://jsonplaceholder.typicode.com'
/* Usar esta url para hacer peticiones al api, solo se debe de cambiar la ip por la del equipo en la que se tiene el api en ejecución */
    private base_url = 'http://172.20.30.75:4004/back'

/* Método para hacer llamadas por get all*/
 getMethod(endpoint: string): Observable<any> {
    return this.http.get<any>(`${this.base_url}/${endpoint}`)
      .pipe(
        tap(_ => console.log('get fetched data')),
        catchError(this.handleError<any>('getData', []))
      );
  }

/* Método para hacer llamadas por post */
 postMethod<T>(body: T, endpoint: string): Observable<T> {
    return this.http.post<T>(`${this.base_url}/${endpoint}`, body)
      .pipe(
        tap(_ => console.log('post fetched data')),
        catchError(this.handleError<T>('postData'))
      );
  }

/* Método para hacer llamadas por put */
 putMethod<T>(id: string, body: T, endpoint: string): Observable<T> {
    return this.http.put<T>(`${this.base_url}/${endpoint}`, body)
      .pipe(
        tap(_ => console.log('updated data')),
        catchError(this.handleError<T>('putData'))
      );
  }

/* Método para llamadas por delete */
deleteMethod<T>(id: string, endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.base_url}/${endpoint}`)
      .pipe(
        tap(_ => console.log('deleted data')),
        catchError(this.handleError<T>('deleteData'))
      );
  }
  // Manejo de errores
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(error); // Log the error to the console

      // Return an observable with a user-facing error message
      return throwError(new Error(`Failed to ${operation}, please try again later`));
    };
  }
}
