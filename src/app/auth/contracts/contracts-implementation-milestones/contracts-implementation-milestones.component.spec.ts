import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsImplementationMilestonesComponent } from './contracts-implementation-milestones.component';

describe('ContractsImplementationMilestonesComponent', () => {
  let component: ContractsImplementationMilestonesComponent;
  let fixture: ComponentFixture<ContractsImplementationMilestonesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContractsImplementationMilestonesComponent]
    });
    fixture = TestBed.createComponent(ContractsImplementationMilestonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
