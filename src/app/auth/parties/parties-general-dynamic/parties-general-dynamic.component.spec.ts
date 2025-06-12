import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartiesGeneralDynamicComponent } from './parties-general-dynamic.component';

describe('PartiesGeneralDynamicComponent', () => {
  let component: PartiesGeneralDynamicComponent;
  let fixture: ComponentFixture<PartiesGeneralDynamicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartiesGeneralDynamicComponent]
    });
    fixture = TestBed.createComponent(PartiesGeneralDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
