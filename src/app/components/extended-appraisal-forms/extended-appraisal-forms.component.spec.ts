import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendedAppraisalFormsComponent } from './extended-appraisal-forms.component';

describe('ExtendedAppraisalFormsComponent', () => {
  let component: ExtendedAppraisalFormsComponent;
  let fixture: ComponentFixture<ExtendedAppraisalFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendedAppraisalFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendedAppraisalFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
