import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

interface IPartie {
  id: number;
  name: string;
}

@Component({
  selector: 'app-tender-tenderers',
  templateUrl: './tender-tenderers.component.html',
  styleUrls: ['./tender-tenderers.component.css'],
})
export class TenderTenderersComponent implements OnInit {
  @Input() tenderersArray: Array<any> = [];
  @Output() addTenderer = new EventEmitter<any>();
  @Output() deleteTenderer = new EventEmitter<any>();

  record_id: string = '';
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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  loadForm(data: any): void {
    data.forEach((tenderer: any) => {
      this.addTenderer.emit({ ...tenderer });
    });
  }

  loadData(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
    });

    this.api.getMethod(`/tender/${this.record_id}`).subscribe((d: any) => {
      const { tender, error, message } = d;

      if (error) {
        console.log('message: ', message);
      } else {
        // load forms
        if (tender !== null) this.loadForm(tender.tenderers);
      }
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  addNewTenderer(): void {
    this.addTenderer.emit(this.tenderersValue);
  }
}
