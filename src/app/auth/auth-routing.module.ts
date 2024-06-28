import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartiesComponent } from './parties/parties.component';
import { BuyerComponent } from './buyer/buyer.component';
import { PlanningComponent } from './planning/planning.component';
import { TenderComponent } from './tender/tender.component';
import { AwardsComponent } from './awards/awards.component';
import { ContractsComponent } from './contracts/contracts.component';
import { ImplementationComponent } from './implementation/implementation.component';

const routes: Routes = [
  { path: 'parties', component: PartiesComponent },
  { path: 'buyer', component: BuyerComponent },
  { path: 'planning', component: PlanningComponent },
  { path: 'tender', component: TenderComponent },
  { path: 'awards', component: AwardsComponent },
  { path: 'contracts', component: ContractsComponent },
  { path: 'implementation', component: ImplementationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
