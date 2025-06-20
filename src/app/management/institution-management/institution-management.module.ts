import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstitutionManagementRoutingModule } from './institution-management-routing.module';
import { InstitutionListComponent } from './components/institution-list/institution-list.component';
import { InstitutionFormComponent } from './components/institution-form/institution-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    InstitutionListComponent,
    InstitutionFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InstitutionManagementRoutingModule,
  ],
})
export class InstitutionManagementModule {}
