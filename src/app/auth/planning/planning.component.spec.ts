import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningComponent } from './planning.component';

describe('PlanningComponent', () => {
  let component: PlanningComponent;
  let fixture: ComponentFixture<PlanningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanningComponent]
    });
    fixture = TestBed.createComponent(PlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
