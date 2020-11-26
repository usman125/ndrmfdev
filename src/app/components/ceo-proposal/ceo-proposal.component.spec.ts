import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CeoProposalComponent } from './ceo-proposal.component';

describe('CeoProposalComponent', () => {
  let component: CeoProposalComponent;
  let fixture: ComponentFixture<CeoProposalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeoProposalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CeoProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
