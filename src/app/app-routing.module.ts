import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartiesComponent } from './auth/parties/parties.component';
import { BuyerComponent } from './auth/buyer/buyer.component';
import { PlanningComponent } from './auth/planning/planning.component';
import { TenderComponent } from './auth/tender/tender.component';
import { AwardsComponent } from './auth/awards/awards.component';
import { ContractsComponent } from './auth/contracts/contracts.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./unauth/unauth.module').then((module) => module.UnauthModule),
  },
  { path: 'parties', component: PartiesComponent },
  { path: 'buyer', component: BuyerComponent },
  { path: 'planning', component: PlanningComponent },
  { path: 'tender', component: TenderComponent },
  { path: 'awards', component: AwardsComponent },
  { path: 'contracts', component: ContractsComponent },
  // { path: '404', component: NotFoundComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
