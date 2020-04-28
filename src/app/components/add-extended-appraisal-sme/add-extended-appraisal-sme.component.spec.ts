import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExtendedAppraisalSmeComponent } from './add-extended-appraisal-sme.component';

describe('AddExtendedAppraisalSmeComponent', () => {
  let component: AddExtendedAppraisalSmeComponent;
  let fixture: ComponentFixture<AddExtendedAppraisalSmeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExtendedAppraisalSmeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExtendedAppraisalSmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
