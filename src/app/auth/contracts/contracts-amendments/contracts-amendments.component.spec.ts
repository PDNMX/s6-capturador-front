import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsAmendmentsComponent } from './contracts-amendments.component';

describe('ContractsAmendmentsComponent', () => {
  let component: ContractsAmendmentsComponent;
  let fixture: ComponentFixture<ContractsAmendmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContractsAmendmentsComponent]
    });
    fixture = TestBed.createComponent(ContractsAmendmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
