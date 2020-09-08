import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cam2Component } from './cam2.component';

describe('Cam2Component', () => {
  let component: Cam2Component;
  let fixture: ComponentFixture<Cam2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cam2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cam2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
