import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPrimaryAppraisalFormComponent } from './add-primary-appraisal-form.component';

describe('AddPrimaryAppraisalFormComponent', () => {
  let component: AddPrimaryAppraisalFormComponent;
  let fixture: ComponentFixture<AddPrimaryAppraisalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPrimaryAppraisalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPrimaryAppraisalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
