import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoHomeComponent } from './po-home.component';

describe('PoHomeComponent', () => {
  let component: PoHomeComponent;
  let fixture: ComponentFixture<PoHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
