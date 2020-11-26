import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepareGiaComponent } from './prepare-gia.component';

describe('PrepareGiaComponent', () => {
  let component: PrepareGiaComponent;
  let fixture: ComponentFixture<PrepareGiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrepareGiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepareGiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
