import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningMilestonesComponent } from './planning-milestones.component';

describe('PlanningMilestonesComponent', () => {
  let component: PlanningMilestonesComponent;
  let fixture: ComponentFixture<PlanningMilestonesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanningMilestonesComponent]
    });
    fixture = TestBed.createComponent(PlanningMilestonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
