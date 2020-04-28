import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryAppraisalFormsComponent } from './primary-appraisal-forms.component';

describe('PrimaryAppraisalFormsComponent', () => {
  let component: PrimaryAppraisalFormsComponent;
  let fixture: ComponentFixture<PrimaryAppraisalFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimaryAppraisalFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimaryAppraisalFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
