import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderDocumentsComponent } from './tender-documents.component';

describe('TenderDocumentsComponent', () => {
  let component: TenderDocumentsComponent;
  let fixture: ComponentFixture<TenderDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TenderDocumentsComponent]
    });
    fixture = TestBed.createComponent(TenderDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
