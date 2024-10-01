import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardsAmendmentsComponent } from './awards-amendments.component';

describe('AwardsAmendmentsComponent', () => {
  let component: AwardsAmendmentsComponent;
  let fixture: ComponentFixture<AwardsAmendmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AwardsAmendmentsComponent]
    });
    fixture = TestBed.createComponent(AwardsAmendmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
