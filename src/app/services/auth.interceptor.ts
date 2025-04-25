import {
  ApplicationRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
  Injector,
} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, from, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ReLoginComponent } from '../unauth/re-login/re-login.component';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isReauthenticating = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private injector: Injector,
    private appRef: ApplicationRef
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const isAuth = this.auth.isAuth();
    const token = this.auth.getToken();
    const timeToExpire = this.auth.timeToExpire();
    const minTimeToExpireToken = environment.MIN_TIME_RELOGIN || 5;
    const isExpiredToken = timeToExpire < minTimeToExpireToken;
    console.log('timeToExpire: ', timeToExpire);
    console.log('isExpiredToken: ', isExpiredToken);
    console.log('this.isReauthenticating: ', this.isReauthenticating);

    if (isAuth) {
      if (isExpiredToken && !this.isReauthenticating) {
        this.isReauthenticating = true;
        console.log('expiro el token');

        return from(this.handleNearingTokenExpired()).pipe(
          switchMap((newToken) => {
            console.log('newToken: ', newToken);

            if (newToken) {
              const newRequest = request.clone({
                setHeaders: { Authorization: `Bearer ${newToken}` },
              });
              return next.handle(newRequest);
            }

            this.auth.logout();
            this.router.navigate(['/login']);
            return throwError(() => new Error('No se obtuvo un nuevo token'));
          })
        );
      }

      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403 && !this.isReauthenticating) {
          this.isReauthenticating = true;

          return from(this.handleTokenExpired()).pipe(
            switchMap((newToken) => {
              if (newToken) {
                const newRequest = request.clone({
                  setHeaders: { Authorization: `Bearer ${newToken}` },
                });
                return next.handle(newRequest);
              }

              this.auth.logout();
              this.router.navigate(['/login']);
              return throwError(() => error);
            })
          );
        }

        return throwError(() => error);
      })
    );
  }

  private async handleNearingTokenExpired(): Promise<string | null> {
    const environmentInjector = inject(EnvironmentInjector);
    const result = await Swal.fire({
      title: 'Sesión a Punto de Expirar',
      text: 'Tu sesión expirará en menos de 5 minutos. Por favor, autenticate para continuar.',
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonText: 'Ir al Login',
      // confirmButtonText: 'Autenticar',
      html: '<div id="re-auth-container"></div>',

      didOpen: () => {
        const container = document.getElementById('re-auth-container');
        if (container) {
          const componentRef = createComponent(ReLoginComponent, {
            environmentInjector,
            elementInjector: this.injector,
          });

          this.appRef.attachView(componentRef.hostView);
          container.appendChild((componentRef.hostView as any).rootNodes[0]);

          componentRef.instance.credentials.subscribe(
            (credentials: { username: string; password: string }) => {
              this.auth
                .login(credentials.username, credentials.password)
                .subscribe((r) => {
                  if (!r.success) {
                    Swal.showValidationMessage('Credenciales incorrectas');
                  }

                  if (r.success) {
                    // this.auth.fetchUserRole();
                    this.isReauthenticating = false;
                    Swal.clickConfirm();
                    Swal.close();
                  }
                });
            }
          );
        }
      },
      preConfirm: () => {
        return false;
      },
    });

    if (!result.isConfirmed) {
      this.auth.logout();
      this.router.navigate(['/login']);
      return null;
    }

    console.log('this.auth.getToken', this.auth.getToken);
    return this.auth.getToken();
  }

  private async handleTokenExpired(): Promise<string | null> {
    const environmentInjector = inject(EnvironmentInjector);
    const result = await Swal.fire({
      title: 'Sesión Expirada',
      text: 'Tu sesión ha expirado. Por favor, reautentica para continuar.',
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonText: 'Ir al Login',
      // confirmButtonText: 'Reautenticar',
      html: '<div id="re-auth-container"></div>',

      didOpen: () => {
        const container = document.getElementById('re-auth-container');
        if (container) {
          const componentRef = createComponent(ReLoginComponent, {
            environmentInjector,
            elementInjector: this.injector,
          });
          this.appRef.attachView(componentRef.hostView);
          container.appendChild((componentRef.hostView as any).rootNodes[0]);

          // Escuchar el evento de credenciales
          componentRef.instance.credentials.subscribe(
            (credentials: { username: string; password: string }) => {
              this.auth
                .login(credentials.username, credentials.password)
                .subscribe((r) => {
                  if (!r.success) {
                    Swal.showValidationMessage('Credenciales incorrectas');
                  }

                  if (r.success) {
                    // this.auth.fetchUserRole();
                    this.isReauthenticating = false;
                    Swal.clickConfirm();
                    Swal.close();
                  }
                });
            }
          );
        }
      },
      preConfirm: () => {
        // Evitar que el modal se cierre automáticamente
        return false;
      },
    });

    if (!result.isConfirmed) {
      this.auth.logout();
      this.router.navigate(['/login']);
      return null;
    }

    return this.auth.getToken();
  }
}
