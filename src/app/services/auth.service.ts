import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

interface IToken {
  access_token: string;
  expires_in: number;
  token_type: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private oauth_api: string = environment.OAUTH_API;
  private OAUTH_CLIENT_ID: string = environment.OAUTH_CLIENT_ID;
  private oauth_client_secret: string = environment.OAUTH_CLIENT_SECRET;

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('username', username)
      .set('password', password)
      .set('scope', 'read')
      .set('client_id', this.OAUTH_CLIENT_ID)
      .set('client_secret', this.oauth_client_secret);

    return this.http
      .post(this.oauth_api, body.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      .pipe(
        map((d) => {
          const { access_token } = d as IToken;
          localStorage.setItem('token', access_token);

          return { success: true, message: '' };
        }),
        catchError((e) => {
          const { error } = e;

          return of({
            success: false,
            message: `${error.code}- ${error.message}`,
          });
        })
      );
  }

  isAuth(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string {
    const token = localStorage.getItem('token');
    return token ? token : '';
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
