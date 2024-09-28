import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartiesAdditionalContactPointsComponent } from './parties-additional-contact-points.component';

describe('PartiesAdditionalContactPointsComponent', () => {
  let component: PartiesAdditionalContactPointsComponent;
  let fixture: ComponentFixture<PartiesAdditionalContactPointsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartiesAdditionalContactPointsComponent]
    });
    fixture = TestBed.createComponent(PartiesAdditionalContactPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
