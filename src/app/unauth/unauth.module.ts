import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnauthRoutingModule } from './unauth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ReLoginComponent } from './re-login/re-login.component';

@NgModule({
  declarations: [LoginComponent, ReLoginComponent],
  imports: [CommonModule, UnauthRoutingModule, ReactiveFormsModule],
})
export class UnauthModule {}
