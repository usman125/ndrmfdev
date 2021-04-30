import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiProjectStatsComponent } from './kpi-project-stats.component';

describe('KpiProjectStatsComponent', () => {
  let component: KpiProjectStatsComponent;
  let fixture: ComponentFixture<KpiProjectStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KpiProjectStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KpiProjectStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
