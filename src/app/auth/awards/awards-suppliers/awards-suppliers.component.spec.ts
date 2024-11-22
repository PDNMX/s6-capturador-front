import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardsSuppliersComponent } from './awards-suppliers.component';

describe('AwardsSuppliersComponent', () => {
  let component: AwardsSuppliersComponent;
  let fixture: ComponentFixture<AwardsSuppliersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AwardsSuppliersComponent]
    });
    fixture = TestBed.createComponent(AwardsSuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
