import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementComponent } from './user-management.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserManagementComponent, UserListComponent],
  imports: [CommonModule, UserManagementRoutingModule, ReactiveFormsModule],
})
export class UserManagementModule {}
