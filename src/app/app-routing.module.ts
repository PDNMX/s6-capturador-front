import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsComponent } from './auth/layouts/layouts.component';
import { authGuard } from './guards/auth.guard';
import { unauthGuard } from './guards/unauth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutsComponent,
    canActivate: [authGuard],
    loadChildren: () =>
      import('./auth/auth.module').then((module) => module.AuthModule),
  },
  {
    path: 'login',
    canActivate: [unauthGuard],
    loadChildren: () =>
      import('./unauth/unauth.module').then((module) => module.UnauthModule),
  },

  // { path: '404', component: NotFoundComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
