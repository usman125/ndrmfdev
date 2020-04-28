import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendedAppraisalComponent } from './extended-appraisal.component';

describe('ExtendedAppraisalComponent', () => {
  let component: ExtendedAppraisalComponent;
  let fixture: ComponentFixture<ExtendedAppraisalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendedAppraisalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendedAppraisalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
