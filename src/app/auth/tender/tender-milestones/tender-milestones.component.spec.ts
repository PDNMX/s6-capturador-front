import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderMilestonesComponent } from './tender-milestones.component';

describe('TenderMilestonesComponent', () => {
  let component: TenderMilestonesComponent;
  let fixture: ComponentFixture<TenderMilestonesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TenderMilestonesComponent]
    });
    fixture = TestBed.createComponent(TenderMilestonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
