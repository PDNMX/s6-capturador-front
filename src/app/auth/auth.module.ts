import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { PartiesComponent } from './parties/parties.component';
import { BuyerComponent } from './buyer/buyer.component';
import { PlanningComponent } from './planning/planning.component';
import { TenderComponent } from './tender/tender.component';
import { AwardsComponent } from './awards/awards.component';
import { ContractsComponent } from './contracts/contracts.component';

@NgModule({
  declarations: [
    PartiesComponent,
    BuyerComponent,
    PlanningComponent,
    TenderComponent,
    AwardsComponent,
    ContractsComponent,
  ],
  imports: [CommonModule, AuthRoutingModule],
  exports: [
    PartiesComponent,
    BuyerComponent,
    PlanningComponent,
    TenderComponent,
    AwardsComponent,
    ContractsComponent,
  ],
})
export class AuthModule {}
