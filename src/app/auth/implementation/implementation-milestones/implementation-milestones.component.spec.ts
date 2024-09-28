import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImplementationMilestonesComponent } from './implementation-milestones.component';

describe('ImplementationMilestonesComponent', () => {
  let component: ImplementationMilestonesComponent;
  let fixture: ComponentFixture<ImplementationMilestonesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImplementationMilestonesComponent]
    });
    fixture = TestBed.createComponent(ImplementationMilestonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
