import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQprComponent } from './view-qpr.component';

describe('ViewQprComponent', () => {
  let component: ViewQprComponent;
  let fixture: ComponentFixture<ViewQprComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewQprComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewQprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
