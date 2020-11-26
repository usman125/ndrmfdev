import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EligibilityRequestsComponent } from './eligibility-requests.component';

describe('EligibilityRequestsComponent', () => {
  let component: EligibilityRequestsComponent;
  let fixture: ComponentFixture<EligibilityRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EligibilityRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EligibilityRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
