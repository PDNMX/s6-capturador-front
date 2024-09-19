import { Component } from '@angular/core';

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
  tenderersArray: Array<any> = [];
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

  addTenderers(): void {
    this.tenderersArray.push({ ...this.tenderersValue });
  }

  deleteTenderers(index: number): void {
    this.tenderersArray = this.tenderersArray.filter((t, i) => i !== index);
  }
}
