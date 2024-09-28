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
import { AwardsAmendmentsComponent } from './awards/awards-amendments/awards-amendments.component';
import { AwardsDocumentsComponent } from './awards/awards-documents/awards-documents.component';
import { AwardsItemsComponent } from './awards/awards-items/awards-items.component';
import { AwardsSuppliersComponent } from './awards/awards-suppliers/awards-suppliers.component';
import { AwardsGeneralComponent } from './awards/awards-general/awards-general.component';
import { PartiesContactPointComponent } from './parties/parties-contact-point/parties-contact-point.component';
import { PartiesAdditionalContactPointsComponent } from './parties/parties-additional-contact-points/parties-additional-contact-points.component';
import { PartiesBeneficialOwnersComponent } from './parties/parties-beneficial-owners/parties-beneficial-owners.component';
import { PartiesGeneralComponent } from './parties/parties-general/parties-general.component';
import { PartiesAddressComponent } from './parties/parties-address/parties-address.component';
import { ImplementationTransactionsComponent } from './implementation/implementation-transactions/implementation-transactions.component';
import { ImplementationMilestonesComponent } from './implementation/implementation-milestones/implementation-milestones.component';
import { ImplementationDocumentsComponent } from './implementation/implementation-documents/implementation-documents.component';

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
    AwardsAmendmentsComponent,
    AwardsDocumentsComponent,
    AwardsItemsComponent,
    AwardsSuppliersComponent,
    AwardsGeneralComponent,
    PartiesContactPointComponent,
    PartiesAdditionalContactPointsComponent,
    PartiesBeneficialOwnersComponent,
    PartiesGeneralComponent,
    PartiesAddressComponent,
    ImplementationTransactionsComponent,
    ImplementationMilestonesComponent,
    ImplementationDocumentsComponent,
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
