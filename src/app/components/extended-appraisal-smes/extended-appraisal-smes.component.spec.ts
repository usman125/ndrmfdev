import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendedAppraisalSmesComponent } from './extended-appraisal-smes.component';

describe('ExtendedAppraisalSmesComponent', () => {
  let component: ExtendedAppraisalSmesComponent;
  let fixture: ComponentFixture<ExtendedAppraisalSmesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendedAppraisalSmesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendedAppraisalSmesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
