import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailExistsDialogComponent } from './email-exists-dialog.component';

describe('EmailExistsDialogComponent', () => {
  let component: EmailExistsDialogComponent;
  let fixture: ComponentFixture<EmailExistsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailExistsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailExistsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
