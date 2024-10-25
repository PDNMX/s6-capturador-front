import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsMilestonesComponent } from './contracts-milestones.component';

describe('ContractsMilestonesComponent', () => {
  let component: ContractsMilestonesComponent;
  let fixture: ComponentFixture<ContractsMilestonesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContractsMilestonesComponent]
    });
    fixture = TestBed.createComponent(ContractsMilestonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
