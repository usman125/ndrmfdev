import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CeoHomeComponent } from './ceo-home.component';

describe('CeoHomeComponent', () => {
  let component: CeoHomeComponent;
  let fixture: ComponentFixture<CeoHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeoHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CeoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
