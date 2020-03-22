import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProposalFormComponent } from './create-proposal-form.component';

describe('CreateProposalFormComponent', () => {
  let component: CreateProposalFormComponent;
  let fixture: ComponentFixture<CreateProposalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProposalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProposalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
