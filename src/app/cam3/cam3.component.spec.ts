import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cam3Component } from './cam3.component';

describe('Cam3Component', () => {
  let component: Cam3Component;
  let fixture: ComponentFixture<Cam3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cam3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cam3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
