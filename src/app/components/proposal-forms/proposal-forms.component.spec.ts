import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalFormsComponent } from './proposal-forms.component';

describe('ProposalFormsComponent', () => {
  let component: ProposalFormsComponent;
  let fixture: ComponentFixture<ProposalFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
