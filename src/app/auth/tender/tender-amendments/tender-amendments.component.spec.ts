import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderAmendmentsComponent } from './tender-amendments.component';

describe('TenderAmendmentsComponent', () => {
  let component: TenderAmendmentsComponent;
  let fixture: ComponentFixture<TenderAmendmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TenderAmendmentsComponent]
    });
    fixture = TestBed.createComponent(TenderAmendmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
