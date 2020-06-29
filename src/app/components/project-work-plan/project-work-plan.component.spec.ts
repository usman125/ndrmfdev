import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectWorkPlanComponent } from './project-work-plan.component';

describe('ProjectWorkPlanComponent', () => {
  let component: ProjectWorkPlanComponent;
  let fixture: ComponentFixture<ProjectWorkPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectWorkPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectWorkPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
