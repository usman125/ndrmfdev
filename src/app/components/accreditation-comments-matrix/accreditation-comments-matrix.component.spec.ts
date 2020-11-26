import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccreditationCommentsMatrixComponent } from './accreditation-comments-matrix.component';

describe('AccreditationCommentsMatrixComponent', () => {
  let component: AccreditationCommentsMatrixComponent;
  let fixture: ComponentFixture<AccreditationCommentsMatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccreditationCommentsMatrixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccreditationCommentsMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
