import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImplementationDocumentsComponent } from './implementation-documents.component';

describe('ImplementationDocumentsComponent', () => {
  let component: ImplementationDocumentsComponent;
  let fixture: ComponentFixture<ImplementationDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImplementationDocumentsComponent]
    });
    fixture = TestBed.createComponent(ImplementationDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
