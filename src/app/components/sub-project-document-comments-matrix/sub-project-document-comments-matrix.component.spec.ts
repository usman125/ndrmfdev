import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubProjectDocumentCommentsMatrixComponent } from './sub-project-document-comments-matrix.component';

describe('SubProjectDocumentCommentsMatrixComponent', () => {
  let component: SubProjectDocumentCommentsMatrixComponent;
  let fixture: ComponentFixture<SubProjectDocumentCommentsMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubProjectDocumentCommentsMatrixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubProjectDocumentCommentsMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
