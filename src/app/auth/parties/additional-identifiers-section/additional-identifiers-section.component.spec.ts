import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalIdentifiersSectionComponent } from './additional-identifiers-section.component';

describe('AdditionalIdentifiersSectionComponent', () => {
  let component: AdditionalIdentifiersSectionComponent;
  let fixture: ComponentFixture<AdditionalIdentifiersSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdditionalIdentifiersSectionComponent]
    });
    fixture = TestBed.createComponent(AdditionalIdentifiersSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
