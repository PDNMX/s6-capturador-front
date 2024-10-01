import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningItemsComponent } from './planning-items.component';

describe('PlanningItemsComponent', () => {
  let component: PlanningItemsComponent;
  let fixture: ComponentFixture<PlanningItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanningItemsComponent]
    });
    fixture = TestBed.createComponent(PlanningItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
