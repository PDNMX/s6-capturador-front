import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImplementationTransactionsComponent } from './implementation-transactions.component';

describe('ImplementationTransactionsComponent', () => {
  let component: ImplementationTransactionsComponent;
  let fixture: ComponentFixture<ImplementationTransactionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImplementationTransactionsComponent]
    });
    fixture = TestBed.createComponent(ImplementationTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
