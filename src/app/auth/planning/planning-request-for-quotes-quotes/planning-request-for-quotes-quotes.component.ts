import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-planning-request-for-quotes-quotes',
  templateUrl: './planning-request-for-quotes-quotes.component.html',
  styleUrls: ['./planning-request-for-quotes-quotes.component.css'],
})
export class PlanningRequestForQuotesQuotesComponent {
  @Input() quotesArray: Array<any> = [];
  @Output() addQuotes = new EventEmitter<any>();
  @Output() deleteQuotes = new EventEmitter<any>();
}
