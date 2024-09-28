import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartiesGeneralComponent } from './parties-general.component';

describe('PartiesGeneralComponent', () => {
  let component: PartiesGeneralComponent;
  let fixture: ComponentFixture<PartiesGeneralComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartiesGeneralComponent]
    });
    fixture = TestBed.createComponent(PartiesGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
