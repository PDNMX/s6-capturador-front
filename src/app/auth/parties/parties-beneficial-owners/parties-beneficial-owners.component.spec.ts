import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartiesBeneficialOwnersComponent } from './parties-beneficial-owners.component';

describe('PartiesBeneficialOwnersComponent', () => {
  let component: PartiesBeneficialOwnersComponent;
  let fixture: ComponentFixture<PartiesBeneficialOwnersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartiesBeneficialOwnersComponent]
    });
    fixture = TestBed.createComponent(PartiesBeneficialOwnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
