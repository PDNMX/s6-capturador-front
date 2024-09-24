import { Component, EventEmitter, Input, Output } from '@angular/core';

interface IPartie {
  id: number;
  name: string;
}

@Component({
  selector: 'app-tender-tenderers',
  templateUrl: './tender-tenderers.component.html',
  styleUrls: ['./tender-tenderers.component.css'],
})
export class TenderTenderersComponent {
  @Input() tenderersArray: Array<any> = [];
  @Output() addTenderer = new EventEmitter<any>();
  @Output() deleteTenderer = new EventEmitter<any>();

  tenderersValue!: IPartie;

  tenderers = [
    {
      id: 1,
      name: 'nombre 1',
    },
    {
      id: 2,
      name: 'nombre 2',
    },

    {
      id: 3,
      name: 'nombre 3',
    },
  ];

  addNewTenderer(): void {
    this.addTenderer.emit(this.tenderersValue);
  }
}
