import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeedDialogComponent } from './add-feed-dialog.component';

describe('AddFeedDialogComponent', () => {
  let component: AddFeedDialogComponent;
  let fixture: ComponentFixture<AddFeedDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFeedDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFeedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
