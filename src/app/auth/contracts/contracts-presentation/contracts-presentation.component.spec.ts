import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsPresentationComponent } from './contracts-presentation.component';

describe('ContractsPresentationComponent', () => {
  let component: ContractsPresentationComponent;
  let fixture: ComponentFixture<ContractsPresentationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContractsPresentationComponent]
    });
    fixture = TestBed.createComponent(ContractsPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
