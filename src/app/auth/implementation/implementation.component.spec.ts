import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImplementationComponent } from './implementation.component';

describe('ImplementationComponent', () => {
  let component: ImplementationComponent;
  let fixture: ComponentFixture<ImplementationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImplementationComponent]
    });
    fixture = TestBed.createComponent(ImplementationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
