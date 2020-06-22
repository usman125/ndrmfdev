import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalFileMatrixComponent } from './proposal-file-matrix.component';

describe('ProposalFileMatrixComponent', () => {
  let component: ProposalFileMatrixComponent;
  let fixture: ComponentFixture<ProposalFileMatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalFileMatrixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalFileMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
