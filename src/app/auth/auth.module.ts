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
import { PlanningBudgetComponent } from './planning/planning-budget/planning-budget.component';
import { PlanningDocumentsComponent } from './planning/planning-documents/planning-documents.component';
import { PlanningGeneralComponent } from './planning/planning-general/planning-general.component';
import { PlanningMilestonesComponent } from './planning/planning-milestones/planning-milestones.component';

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
import { PlanningBudgetBudgetBreakdownComponent } from './planning/planning-budget-budget-breakdown/planning-budget-budget-breakdown.component';
import { ContractsImplementationComponent } from './contracts/contracts-implementation/contracts-implementation.component';
import { ContractsImplementationTransactionsComponent } from './contracts/contracts-implementation-transactions/contracts-implementation-transactions.component';
import { ContractsImplementationMilestonesComponent } from './contracts/contracts-implementation-milestones/contracts-implementation-milestones.component';
import { ContractsImplementationDocumentsComponent } from './contracts/contracts-implementation-documents/contracts-implementation-documents.component';
import { PlanningRequestForQuotesItemsComponent } from './planning/planning-request-for-quotes-items/planning-request-for-quotes-items.component';
import { PlanningRequestForQuotesQuotesComponent } from './planning/planning-request-for-quotes-quotes/planning-request-for-quotes-quotes.component';
import { PlanningRequestForQuotesComponent } from './planning/planning-request-for-quotes/planning-request-for-quotes.component';
import { ContractsGeneralComponent } from './contracts/contracts-general/contracts-general.component';
import { ContractsGuaranteesComponent } from './contracts/contracts-guarantees/contracts-guarantees.component';
import { ContractsDocumentsComponent } from './contracts/contracts-documents/contracts-documents.component';

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
    PlanningBudgetComponent,
    PlanningDocumentsComponent,
    PlanningGeneralComponent,
    PlanningMilestonesComponent,
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
    PlanningBudgetBudgetBreakdownComponent,
    ContractsImplementationComponent,
    ContractsImplementationTransactionsComponent,
    ContractsImplementationMilestonesComponent,
    ContractsImplementationDocumentsComponent,
    PlanningRequestForQuotesItemsComponent,
    PlanningRequestForQuotesQuotesComponent,
    PlanningRequestForQuotesComponent,
    ContractsGeneralComponent,
    ContractsGuaranteesComponent,
    ContractsDocumentsComponent,
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
