import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubProjectDocumentDmpamTasksComponent } from './sub-project-document-dmpam-tasks.component';

describe('SubProjectDocumentDmpamTasksComponent', () => {
  let component: SubProjectDocumentDmpamTasksComponent;
  let fixture: ComponentFixture<SubProjectDocumentDmpamTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubProjectDocumentDmpamTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubProjectDocumentDmpamTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
