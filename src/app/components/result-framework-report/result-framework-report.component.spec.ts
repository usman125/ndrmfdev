import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultFrameworkReportComponent } from './result-framework-report.component';

describe('ResultFrameworkReportComponent', () => {
  let component: ResultFrameworkReportComponent;
  let fixture: ComponentFixture<ResultFrameworkReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultFrameworkReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultFrameworkReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
