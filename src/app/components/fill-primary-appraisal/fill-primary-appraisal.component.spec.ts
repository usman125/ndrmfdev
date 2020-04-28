import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillPrimaryAppraisalComponent } from './fill-primary-appraisal.component';

describe('FillPrimaryAppraisalComponent', () => {
  let component: FillPrimaryAppraisalComponent;
  let fixture: ComponentFixture<FillPrimaryAppraisalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillPrimaryAppraisalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillPrimaryAppraisalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
