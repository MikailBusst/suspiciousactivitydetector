import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateSystemReportComponent } from './generate-system-report.component';

describe('GenerateSystemReportComponent', () => {
  let component: GenerateSystemReportComponent;
  let fixture: ComponentFixture<GenerateSystemReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateSystemReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateSystemReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
