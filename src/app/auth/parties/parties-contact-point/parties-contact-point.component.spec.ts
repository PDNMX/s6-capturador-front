import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartiesContactPointComponent } from './parties-contact-point.component';

describe('PartiesContactPointComponent', () => {
  let component: PartiesContactPointComponent;
  let fixture: ComponentFixture<PartiesContactPointComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartiesContactPointComponent]
    });
    fixture = TestBed.createComponent(PartiesContactPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
