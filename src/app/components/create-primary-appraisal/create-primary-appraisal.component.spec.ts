import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePrimaryAppraisalComponent } from './create-primary-appraisal.component';

describe('CreatePrimaryAppraisalComponent', () => {
  let component: CreatePrimaryAppraisalComponent;
  let fixture: ComponentFixture<CreatePrimaryAppraisalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePrimaryAppraisalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePrimaryAppraisalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
