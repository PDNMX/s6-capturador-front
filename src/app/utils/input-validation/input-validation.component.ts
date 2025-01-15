import { Component, Input } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css'],
})
export class InputValidationComponent {
  @Input() message: string = '';
  @Input() element!: FormControl;
}
