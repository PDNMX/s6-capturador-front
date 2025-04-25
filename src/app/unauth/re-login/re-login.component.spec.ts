import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReLoginComponent } from './re-login.component';

describe('ReLoginComponent', () => {
  let component: ReLoginComponent;
  let fixture: ComponentFixture<ReLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReLoginComponent]
    });
    fixture = TestBed.createComponent(ReLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
