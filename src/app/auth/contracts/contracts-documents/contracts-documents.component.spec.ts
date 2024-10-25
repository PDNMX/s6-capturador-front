import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsDocumentsComponent } from './contracts-documents.component';

describe('ContractsDocumentsComponent', () => {
  let component: ContractsDocumentsComponent;
  let fixture: ComponentFixture<ContractsDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContractsDocumentsComponent]
    });
    fixture = TestBed.createComponent(ContractsDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
