import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillQprComponent } from './fill-qpr.component';

describe('FillQprComponent', () => {
  let component: FillQprComponent;
  let fixture: ComponentFixture<FillQprComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillQprComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillQprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
