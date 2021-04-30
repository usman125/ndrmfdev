import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateComplaintStatusComponent } from './update-complaint-status.component';

describe('UpdateComplaintStatusComponent', () => {
  let component: UpdateComplaintStatusComponent;
  let fixture: ComponentFixture<UpdateComplaintStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateComplaintStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateComplaintStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
