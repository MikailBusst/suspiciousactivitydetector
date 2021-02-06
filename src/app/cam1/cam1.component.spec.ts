import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cam1Component } from './cam1.component';

describe('Cam1Component', () => {
  let component: Cam1Component;
  let fixture: ComponentFixture<Cam1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cam1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cam1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
