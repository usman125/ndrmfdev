import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryAppraisalComponent } from './primary-appraisal.component';

describe('PrimaryAppraisalComponent', () => {
  let component: PrimaryAppraisalComponent;
  let fixture: ComponentFixture<PrimaryAppraisalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimaryAppraisalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimaryAppraisalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
