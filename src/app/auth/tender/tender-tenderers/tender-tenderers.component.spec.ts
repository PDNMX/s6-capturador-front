import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderTenderersComponent } from './tender-tenderers.component';

describe('TenderTenderersComponent', () => {
  let component: TenderTenderersComponent;
  let fixture: ComponentFixture<TenderTenderersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TenderTenderersComponent]
    });
    fixture = TestBed.createComponent(TenderTenderersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
