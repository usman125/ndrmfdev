import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailToConcernPersonComponent } from './email-to-concern-person.component';

describe('EmailToConcernPersonComponent', () => {
  let component: EmailToConcernPersonComponent;
  let fixture: ComponentFixture<EmailToConcernPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailToConcernPersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailToConcernPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
