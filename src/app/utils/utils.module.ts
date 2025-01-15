import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputValidationComponent } from './input-validation/input-validation.component';

@NgModule({
  declarations: [InputValidationComponent],
  imports: [CommonModule],
  exports: [InputValidationComponent],
})
export class UtilsModule {}
