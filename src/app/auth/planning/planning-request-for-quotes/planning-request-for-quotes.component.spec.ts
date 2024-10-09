import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningRequestForQuotesComponent } from './planning-request-for-quotes.component';

describe('PlanningRequestForQuotesComponent', () => {
  let component: PlanningRequestForQuotesComponent;
  let fixture: ComponentFixture<PlanningRequestForQuotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanningRequestForQuotesComponent]
    });
    fixture = TestBed.createComponent(PlanningRequestForQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
