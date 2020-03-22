import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProposalSectionComponent } from './add-proposal-section.component';

describe('AddProposalSectionComponent', () => {
  let component: AddProposalSectionComponent;
  let fixture: ComponentFixture<AddProposalSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProposalSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProposalSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
