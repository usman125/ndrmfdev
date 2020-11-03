import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectProposalFilesComponent } from './project-proposal-files.component';

describe('ProjectProposalFilesComponent', () => {
  let component: ProjectProposalFilesComponent;
  let fixture: ComponentFixture<ProjectProposalFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectProposalFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectProposalFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
