import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsImplementationTransactionsComponent } from './contracts-implementation-transactions.component';

describe('ContractsImplementationTransactionsComponent', () => {
  let component: ContractsImplementationTransactionsComponent;
  let fixture: ComponentFixture<ContractsImplementationTransactionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContractsImplementationTransactionsComponent]
    });
    fixture = TestBed.createComponent(ContractsImplementationTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
