import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubProjectDocumentTasksComponent } from './sub-project-document-tasks.component';

describe('SubProjectDocumentTasksComponent', () => {
  let component: SubProjectDocumentTasksComponent;
  let fixture: ComponentFixture<SubProjectDocumentTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubProjectDocumentTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubProjectDocumentTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
