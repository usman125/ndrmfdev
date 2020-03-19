import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FipHomeComponent } from './fip-home.component';

describe('FipHomeComponent', () => {
  let component: FipHomeComponent;
  let fixture: ComponentFixture<FipHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FipHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FipHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
