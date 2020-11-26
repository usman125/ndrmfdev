import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FipEligibilityComponent } from './fip-eligibility.component';

describe('FipEligibilityComponent', () => {
  let component: FipEligibilityComponent;
  let fixture: ComponentFixture<FipEligibilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FipEligibilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FipEligibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
