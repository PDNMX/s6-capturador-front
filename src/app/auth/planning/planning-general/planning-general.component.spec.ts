import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningGeneralComponent } from './planning-general.component';

describe('PlanningGeneralComponent', () => {
  let component: PlanningGeneralComponent;
  let fixture: ComponentFixture<PlanningGeneralComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanningGeneralComponent]
    });
    fixture = TestBed.createComponent(PlanningGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
