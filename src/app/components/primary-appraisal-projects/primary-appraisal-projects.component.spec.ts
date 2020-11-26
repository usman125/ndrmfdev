import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryAppraisalProjectsComponent } from './primary-appraisal-projects.component';

describe('PrimaryAppraisalProjectsComponent', () => {
  let component: PrimaryAppraisalProjectsComponent;
  let fixture: ComponentFixture<PrimaryAppraisalProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimaryAppraisalProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimaryAppraisalProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
