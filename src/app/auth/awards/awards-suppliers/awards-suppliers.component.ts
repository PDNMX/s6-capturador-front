import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';

interface IPartie {
  id: number;
  name: string;
}

@Component({
  selector: 'app-awards-suppliers',
  templateUrl: './awards-suppliers.component.html',
  styleUrls: ['./awards-suppliers.component.css'],
})
export class AwardsSuppliersComponent {
  @Input() suppliersArray: Array<any> = [];
  @Output() addSupplier = new EventEmitter<any>();
  @Output() deleteSupplier = new EventEmitter<any>();

  record_id: string = '';

  suppliersValue!: IPartie;
  suppliers= [
    {
      id: 1,
      name: 'Actor 1',
    },
    {
      id: 2,
      name: 'Actor 2',
    },
    {
      id: 3,
      name: 'Actor 3',
    },
  ];

  addNewSupplier(): void {
    this.addSupplier.emit(this.suppliersValue);
    console.log(this.suppliersValue);
  }

}
