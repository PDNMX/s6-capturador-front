import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsGuaranteesComponent } from './contracts-guarantees.component';

describe('ContractsGuaranteesComponent', () => {
  let component: ContractsGuaranteesComponent;
  let fixture: ComponentFixture<ContractsGuaranteesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContractsGuaranteesComponent]
    });
    fixture = TestBed.createComponent(ContractsGuaranteesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
