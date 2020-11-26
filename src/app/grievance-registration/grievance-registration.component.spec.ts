import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrievanceRegistrationComponent } from './grievance-registration.component';

describe('GrievanceRegistrationComponent', () => {
  let component: GrievanceRegistrationComponent;
  let fixture: ComponentFixture<GrievanceRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrievanceRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrievanceRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
