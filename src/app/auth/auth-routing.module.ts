import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartiesComponent } from './parties/parties.component';
import { BuyerComponent } from './buyer/buyer.component';
import { PlanningComponent } from './planning/planning.component';
import { TenderComponent } from './tender/tender.component';
import { AwardsComponent } from './awards/awards.component';
import { ContractsComponent } from './contracts/contracts.component';
import { ImplementationComponent } from './implementation/implementation.component';
import { authGuard } from '../guards/auth.guard';
import { RecordsComponent } from './records/records.component';

const routes: Routes = [
  { path: '', component: RecordsComponent, canActivate: [authGuard] },
  { path: 'parties', component: PartiesComponent, canActivate: [authGuard] },
  { path: 'buyer', component: BuyerComponent, canActivate: [authGuard] },
  { path: 'planning', component: PlanningComponent, canActivate: [authGuard] },
  { path: 'tender', component: TenderComponent, canActivate: [authGuard] },
  { path: 'awards', component: AwardsComponent, canActivate: [authGuard] },
  {
    path: 'contracts',
    component: ContractsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'implementation',
    component: ImplementationComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
