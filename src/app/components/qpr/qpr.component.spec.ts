import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QprComponent } from './qpr.component';

describe('QprComponent', () => {
  let component: QprComponent;
  let fixture: ComponentFixture<QprComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QprComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
