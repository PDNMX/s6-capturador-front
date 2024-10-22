import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsItemsComponent } from './contracts-items.component';

describe('ContractsItemsComponent', () => {
  let component: ContractsItemsComponent;
  let fixture: ComponentFixture<ContractsItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContractsItemsComponent]
    });
    fixture = TestBed.createComponent(ContractsItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
