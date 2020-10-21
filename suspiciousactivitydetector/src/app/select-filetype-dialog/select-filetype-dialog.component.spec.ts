import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFiletypeDialogComponent } from './select-filetype-dialog.component';

describe('SelectFiletypeDialogComponent', () => {
  let component: SelectFiletypeDialogComponent;
  let fixture: ComponentFixture<SelectFiletypeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectFiletypeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectFiletypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
