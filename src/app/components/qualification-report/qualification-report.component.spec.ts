import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificationReportComponent } from './qualification-report.component';

describe('QualificationReportComponent', () => {
  let component: QualificationReportComponent;
  let fixture: ComponentFixture<QualificationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualificationReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QualificationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
