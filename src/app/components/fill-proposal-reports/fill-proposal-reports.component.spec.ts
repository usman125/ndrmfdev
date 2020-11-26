import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillProposalReportsComponent } from './fill-proposal-reports.component';

describe('FillProposalReportsComponent', () => {
  let component: FillProposalReportsComponent;
  let fixture: ComponentFixture<FillProposalReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillProposalReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillProposalReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
