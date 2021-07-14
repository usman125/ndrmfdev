import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectClosureRequestComponent } from './project-closure-request.component';

describe('ProjectClosureRequestComponent', () => {
  let component: ProjectClosureRequestComponent;
  let fixture: ComponentFixture<ProjectClosureRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectClosureRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectClosureRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
