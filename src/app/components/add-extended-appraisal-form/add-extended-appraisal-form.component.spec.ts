import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExtendedAppraisalFormComponent } from './add-extended-appraisal-form.component';

describe('AddExtendedAppraisalFormComponent', () => {
  let component: AddExtendedAppraisalFormComponent;
  let fixture: ComponentFixture<AddExtendedAppraisalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExtendedAppraisalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExtendedAppraisalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
