import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.BACKEND_API}/users`; // URL desde variables de entorno

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getHeaders(): HttpHeaders {
    const isAuth = this.auth.isAuth();
    const token = this.auth.getToken();

    return isAuth
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(
      this.apiUrl,
      { data: user },
      {
        headers: this.getHeaders(),
      }
    );
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(
      `${this.apiUrl}/${id}`,
      { data: user, query: { id } },
      {
        headers: this.getHeaders(),
      }
    );
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
