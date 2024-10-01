import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const auth: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const isAuth = auth.isAuth();

  const isExpiredToken = auth.isExpiredToken();
  console.log('isExpiredToken: ', isExpiredToken);

  if (!isAuth) router.navigate(['/login']);

  // if (isExpiredToken) {
  //   auth.logout();
  //   router.navigate(['/login']);
  // }

  return isAuth;
};
