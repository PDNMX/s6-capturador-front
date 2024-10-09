import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningRequestForQuotesItemsComponent } from './planning-request-for-quotes-items.component';

describe('PlanningRequestForQuotesItemsComponent', () => {
  let component: PlanningRequestForQuotesItemsComponent;
  let fixture: ComponentFixture<PlanningRequestForQuotesItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanningRequestForQuotesItemsComponent]
    });
    fixture = TestBed.createComponent(PlanningRequestForQuotesItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
