import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsImplementationDocumentsComponent } from './contracts-implementation-documents.component';

describe('ContractsImplementationDocumentsComponent', () => {
  let component: ContractsImplementationDocumentsComponent;
  let fixture: ComponentFixture<ContractsImplementationDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContractsImplementationDocumentsComponent]
    });
    fixture = TestBed.createComponent(ContractsImplementationDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
