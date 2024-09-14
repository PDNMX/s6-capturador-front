import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderGeneralComponent } from './tender-general.component';

describe('TenderGeneralComponent', () => {
  let component: TenderGeneralComponent;
  let fixture: ComponentFixture<TenderGeneralComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TenderGeneralComponent]
    });
    fixture = TestBed.createComponent(TenderGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
