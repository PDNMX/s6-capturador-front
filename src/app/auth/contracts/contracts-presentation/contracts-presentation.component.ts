import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-contracts-presentation',
  templateUrl: './contracts-presentation.component.html',
  styleUrls: ['./contracts-presentation.component.css'],
})
export class ContractsPresentationComponent {
  @Input() contractsArray: Array<any> = [];
  @Output() addNewContract = new EventEmitter<any>();
  @Output() deleteContract = new EventEmitter<any>();
}
