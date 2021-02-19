import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectreportComponent } from './selectreport.component';

describe('SelectreportComponent', () => {
  let component: SelectreportComponent;
  let fixture: ComponentFixture<SelectreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
