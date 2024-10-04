import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsImplementationComponent } from './contracts-implementation.component';

describe('ContractsImplementationComponent', () => {
  let component: ContractsImplementationComponent;
  let fixture: ComponentFixture<ContractsImplementationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContractsImplementationComponent]
    });
    fixture = TestBed.createComponent(ContractsImplementationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
