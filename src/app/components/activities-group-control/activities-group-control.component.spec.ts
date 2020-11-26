import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesGroupControlComponent } from './activities-group-control.component';

describe('ActivitiesGroupControlComponent', () => {
  let component: ActivitiesGroupControlComponent;
  let fixture: ComponentFixture<ActivitiesGroupControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitiesGroupControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiesGroupControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
