import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningBudgetComponent } from './planning-budget.component';

describe('PlanningBudgetComponent', () => {
  let component: PlanningBudgetComponent;
  let fixture: ComponentFixture<PlanningBudgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanningBudgetComponent]
    });
    fixture = TestBed.createComponent(PlanningBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
