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
  {
    path: 'parties/:id',
    component: PartiesComponent,
    canActivate: [authGuard],
  },
  { path: 'buyer/:id', component: BuyerComponent, canActivate: [authGuard] },
  {
    path: 'planning/:id',
    component: PlanningComponent,
    canActivate: [authGuard],
  },
  { path: 'tender/:id', component: TenderComponent, canActivate: [authGuard] },
  { path: 'awards/:id', component: AwardsComponent, canActivate: [authGuard] },
  {
    path: 'contracts/:id',
    component: ContractsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'implementation/:id',
    component: ImplementationComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
