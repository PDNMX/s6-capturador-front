import { Component } from '@angular/core';
import {
  AdditionalProcurementCategories,
  AwardCriteria,
  mainProcurementCategory,
  Metodos,
  Monedas,
  SubmissionMethod,
} from 'src/utils';

@Component({
  selector: 'app-tender-general',
  templateUrl: './tender-general.component.html',
  styleUrls: ['./tender-general.component.css'],
})
export class TenderGeneralComponent {
  monedas = Monedas;
  metodos = Metodos;
  categoriaCompra = mainProcurementCategory;
  adicionalCategoriaCompra = AdditionalProcurementCategories;
  awardCriteria = AwardCriteria;
  submissionMethod = SubmissionMethod;
}
