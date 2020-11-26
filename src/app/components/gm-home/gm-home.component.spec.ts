import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmHomeComponent } from './gm-home.component';

describe('GmHomeComponent', () => {
  let component: GmHomeComponent;
  let fixture: ComponentFixture<GmHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
