import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningDocumentsComponent } from './planning-documents.component';

describe('PlanningDocumentsComponent', () => {
  let component: PlanningDocumentsComponent;
  let fixture: ComponentFixture<PlanningDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanningDocumentsComponent]
    });
    fixture = TestBed.createComponent(PlanningDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
