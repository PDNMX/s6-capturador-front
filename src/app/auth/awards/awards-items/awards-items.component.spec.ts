import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardsItemsComponent } from './awards-items.component';

describe('AwardsItemsComponent', () => {
  let component: AwardsItemsComponent;
  let fixture: ComponentFixture<AwardsItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AwardsItemsComponent]
    });
    fixture = TestBed.createComponent(AwardsItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
