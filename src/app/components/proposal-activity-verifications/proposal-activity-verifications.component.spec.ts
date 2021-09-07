import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalActivityVerificationsComponent } from './proposal-activity-verifications.component';

describe('ProposalActivityVerificationsComponent', () => {
  let component: ProposalActivityVerificationsComponent;
  let fixture: ComponentFixture<ProposalActivityVerificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProposalActivityVerificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalActivityVerificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
