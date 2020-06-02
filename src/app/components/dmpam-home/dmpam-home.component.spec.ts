import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmpamHomeComponent } from './dmpam-home.component';

describe('DmpamHomeComponent', () => {
  let component: DmpamHomeComponent;
  let fixture: ComponentFixture<DmpamHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmpamHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmpamHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
