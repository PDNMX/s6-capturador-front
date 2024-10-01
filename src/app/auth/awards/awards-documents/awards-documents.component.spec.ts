import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardsDocumentsComponent } from './awards-documents.component';

describe('AwardsDocumentsComponent', () => {
  let component: AwardsDocumentsComponent;
  let fixture: ComponentFixture<AwardsDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AwardsDocumentsComponent]
    });
    fixture = TestBed.createComponent(AwardsDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
