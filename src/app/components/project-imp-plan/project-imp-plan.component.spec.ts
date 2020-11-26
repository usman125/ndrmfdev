import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectImpPlanComponent } from './project-imp-plan.component';

describe('ProjectImpPlanComponent', () => {
  let component: ProjectImpPlanComponent;
  let fixture: ComponentFixture<ProjectImpPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectImpPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectImpPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
