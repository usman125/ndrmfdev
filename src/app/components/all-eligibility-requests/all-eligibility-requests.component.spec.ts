import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEligibilityRequestsComponent } from './all-eligibility-requests.component';

describe('AllEligibilityRequestsComponent', () => {
  let component: AllEligibilityRequestsComponent;
  let fixture: ComponentFixture<AllEligibilityRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllEligibilityRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllEligibilityRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
