import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiaCommentsMatrixComponent } from './gia-comments-matrix.component';

describe('GiaCommentsMatrixComponent', () => {
  let component: GiaCommentsMatrixComponent;
  let fixture: ComponentFixture<GiaCommentsMatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiaCommentsMatrixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiaCommentsMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
