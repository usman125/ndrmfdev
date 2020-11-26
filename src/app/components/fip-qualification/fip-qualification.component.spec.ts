import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FipQualificationComponent } from './fip-qualification.component';

describe('FipQualificationComponent', () => {
  let component: FipQualificationComponent;
  let fixture: ComponentFixture<FipQualificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FipQualificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FipQualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
