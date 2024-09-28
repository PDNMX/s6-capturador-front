import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardsGeneralComponent } from './awards-general.component';

describe('AwardsGeneralComponent', () => {
  let component: AwardsGeneralComponent;
  let fixture: ComponentFixture<AwardsGeneralComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AwardsGeneralComponent]
    });
    fixture = TestBed.createComponent(AwardsGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
