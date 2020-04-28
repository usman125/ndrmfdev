import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPrimaryAppraisalComponent } from './view-primary-appraisal.component';

describe('ViewPrimaryAppraisalComponent', () => {
  let component: ViewPrimaryAppraisalComponent;
  let fixture: ComponentFixture<ViewPrimaryAppraisalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPrimaryAppraisalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPrimaryAppraisalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
