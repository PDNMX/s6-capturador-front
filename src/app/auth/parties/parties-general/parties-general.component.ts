import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-parties-general',
  templateUrl: './parties-general.component.html',
  styleUrls: ['./parties-general.component.css'],
})
export class PartiesGeneralComponent {
  Parties!: FormGroup;

  rolesList = [
    {
      id: '',
      label: '',
    },
  ];

  onSubmit(): void {}
  onRoleChange(): void {}
}
