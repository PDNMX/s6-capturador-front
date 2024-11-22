import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningBudgetBudgetBreakdownComponent } from './planning-budget-budget-breakdown.component';

describe('PlanningBudgetBudgetBreakdownComponent', () => {
  let component: PlanningBudgetBudgetBreakdownComponent;
  let fixture: ComponentFixture<PlanningBudgetBudgetBreakdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanningBudgetBudgetBreakdownComponent]
    });
    fixture = TestBed.createComponent(PlanningBudgetBudgetBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
