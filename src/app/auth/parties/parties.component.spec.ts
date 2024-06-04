import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartiesComponent } from './parties.component';

describe('PartiesComponent', () => {
  let component: PartiesComponent;
  let fixture: ComponentFixture<PartiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartiesComponent]
    });
    fixture = TestBed.createComponent(PartiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
