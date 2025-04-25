import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
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
  private oauth_client_id: string = environment.OAUTH_CLIENT_ID;
  private oauth_client_secret: string = environment.OAUTH_CLIENT_SECRET;

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('username', username)
      .set('password', password)
      .set('scope', 'read')
      .set('client_id', this.oauth_client_id)
      .set('client_secret', this.oauth_client_secret);

    return this.http
      .post(this.oauth_api, body.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      .pipe(
        map((d) => {
          const { access_token, expires_in } = d as IToken;

          this.saveToken({ access_token, expires_in });

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

  timeToExpire(): number {
    const objMaxTimeToken = localStorage.getItem('maxTimeToken');
    if (objMaxTimeToken) {
      const { maxTimeToken } = JSON.parse(objMaxTimeToken);
      const nowTime = Date.now();

      return (maxTimeToken - nowTime) / 1000 / 60;
    }

    return 0;
  }

  isExpiredToken(): boolean {
    let expired = true;

    const objMaxTimeToken = localStorage.getItem('maxTimeToken');
    if (objMaxTimeToken) {
      const { maxTimeToken } = JSON.parse(objMaxTimeToken);
      const nowTime = Date.now();

      console.log(
        'maxTimeToken - nowTime: ',
        (maxTimeToken - nowTime) / 1000 / 60
      );
      return maxTimeToken - nowTime < 0;
    }

    return expired;
  }

  isAuth(): boolean {
    return !!localStorage.getItem('token');
  }

  saveToken(info: { access_token: string; expires_in: number }): void {
    const maxTimeToken = info.expires_in * 1000 + Date.now();
    localStorage.setItem('token', info.access_token);
    localStorage.setItem('maxTimeToken', JSON.stringify({ maxTimeToken }));
  }

  getToken(): string {
    const token = localStorage.getItem('token');
    return token ? token : '';
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('record');
    localStorage.removeItem('maxTimeToken');
  }
}
