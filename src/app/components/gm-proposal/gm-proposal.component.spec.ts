import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmProposalComponent } from './gm-proposal.component';

describe('GmProposalComponent', () => {
  let component: GmProposalComponent;
  let fixture: ComponentFixture<GmProposalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmProposalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
