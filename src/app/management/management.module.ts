import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './management.component';
import { UserManagementModule } from './user-management/user-management.module';
import { InstitutionManagementModule } from './institution-management/institution-management.module';

@NgModule({
  declarations: [ManagementComponent],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    UserManagementModule,
    InstitutionManagementModule,
  ],
})
export class ManagementModule {}
