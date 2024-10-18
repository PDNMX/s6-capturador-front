import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsGeneralComponent } from './contracts-general.component';

describe('ContractsGeneralComponent', () => {
  let component: ContractsGeneralComponent;
  let fixture: ComponentFixture<ContractsGeneralComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContractsGeneralComponent]
    });
    fixture = TestBed.createComponent(ContractsGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
