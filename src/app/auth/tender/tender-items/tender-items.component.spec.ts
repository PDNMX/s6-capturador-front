import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderItemsComponent } from './tender-items.component';

describe('TenderItemsComponent', () => {
  let component: TenderItemsComponent;
  let fixture: ComponentFixture<TenderItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TenderItemsComponent]
    });
    fixture = TestBed.createComponent(TenderItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
