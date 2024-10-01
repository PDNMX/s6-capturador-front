import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningQuotesComponent } from './planning-quotes.component';

describe('PlanningQuotesComponent', () => {
  let component: PlanningQuotesComponent;
  let fixture: ComponentFixture<PlanningQuotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanningQuotesComponent]
    });
    fixture = TestBed.createComponent(PlanningQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
