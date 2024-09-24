import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { PartiesComponent } from './parties/parties.component';
import { BuyerComponent } from './buyer/buyer.component';
import { PlanningComponent } from './planning/planning.component';
import { TenderComponent } from './tender/tender.component';
import { AwardsComponent } from './awards/awards.component';
import { ContractsComponent } from './contracts/contracts.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImplementationComponent } from './implementation/implementation.component';
import { RecordsComponent } from './records/records.component';
import { MenuSuperiorComponent } from './layouts/menu-superior/menu-superior.component';
import { TenderGeneralComponent } from './tender/tender-general/tender-general.component';
import { TenderItemsComponent } from './tender/tender-items/tender-items.component';
import { TenderMeetingsComponent } from './tender/tender-meetings/tender-meetings.component';
import { TenderTenderersComponent } from './tender/tender-tenderers/tender-tenderers.component';
import { TenderDocumentsComponent } from './tender/tender-documents/tender-documents.component';
import { TenderMilestonesComponent } from './tender/tender-milestones/tender-milestones.component';
import { TenderAmendmentsComponent } from './tender/tender-amendments/tender-amendments.component';

@NgModule({
  declarations: [
    PartiesComponent,
    BuyerComponent,
    PlanningComponent,
    TenderComponent,
    AwardsComponent,
    ContractsComponent,
    LayoutsComponent,
    ImplementationComponent,
    RecordsComponent,
    MenuSuperiorComponent,
    TenderGeneralComponent,
    TenderItemsComponent,
    TenderMeetingsComponent,
    TenderTenderersComponent,
    TenderDocumentsComponent,
    TenderMilestonesComponent,
    TenderAmendmentsComponent,
  ],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, FormsModule],
  exports: [
    PartiesComponent,
    BuyerComponent,
    PlanningComponent,
    TenderComponent,
    AwardsComponent,
    ContractsComponent,
    LayoutsComponent,
    ImplementationComponent,
  ],
})
export class AuthModule {}
