import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderMeetingsComponent } from './tender-meetings.component';

describe('TenderMeetingsComponent', () => {
  let component: TenderMeetingsComponent;
  let fixture: ComponentFixture<TenderMeetingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TenderMeetingsComponent]
    });
    fixture = TestBed.createComponent(TenderMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
