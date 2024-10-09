import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningRequestForQuotesQuotesComponent } from './planning-request-for-quotes-quotes.component';

describe('PlanningRequestForQuotesQuotesComponent', () => {
  let component: PlanningRequestForQuotesQuotesComponent;
  let fixture: ComponentFixture<PlanningRequestForQuotesQuotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanningRequestForQuotesQuotesComponent]
    });
    fixture = TestBed.createComponent(PlanningRequestForQuotesQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
