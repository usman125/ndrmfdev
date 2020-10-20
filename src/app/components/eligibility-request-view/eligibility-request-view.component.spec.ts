import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EligibilityRequestViewComponent } from './eligibility-request-view.component';

describe('EligibilityRequestViewComponent', () => {
  let component: EligibilityRequestViewComponent;
  let fixture: ComponentFixture<EligibilityRequestViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EligibilityRequestViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EligibilityRequestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
