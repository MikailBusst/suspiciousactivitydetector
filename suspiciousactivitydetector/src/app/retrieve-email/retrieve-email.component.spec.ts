import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetrieveEmailComponent } from './retrieve-email.component';

describe('RetrieveEmailComponent', () => {
  let component: RetrieveEmailComponent;
  let fixture: ComponentFixture<RetrieveEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetrieveEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetrieveEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
