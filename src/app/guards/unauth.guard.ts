import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const unauthGuard: CanActivateFn = (route, state) => {
  const auth: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const isAuth = auth.isAuth();

  if (isAuth) router.navigate(['/']);

  return !isAuth;
};
