import { Component } from '@angular/core';
import {
  AdditionalProcurementCategories,
  AwardCriteria,
  Currency,
  mainProcurementCategory,
  ProcurementMethod,
  SubmissionMethod,
} from 'src/utils';

@Component({
  selector: 'app-tender-general',
  templateUrl: './tender-general.component.html',
  styleUrls: ['./tender-general.component.css'],
})
export class TenderGeneralComponent {
  currency = Currency;
  procurementMethod = ProcurementMethod;
  categoriaCompra = mainProcurementCategory;
  adicionalCategoriaCompra = AdditionalProcurementCategories;
  awardCriteria = AwardCriteria;
  submissionMethod = SubmissionMethod;
}
