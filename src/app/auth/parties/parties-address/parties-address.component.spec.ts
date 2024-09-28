import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartiesAddressComponent } from './parties-address.component';

describe('PartiesAddressComponent', () => {
  let component: PartiesAddressComponent;
  let fixture: ComponentFixture<PartiesAddressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartiesAddressComponent]
    });
    fixture = TestBed.createComponent(PartiesAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
