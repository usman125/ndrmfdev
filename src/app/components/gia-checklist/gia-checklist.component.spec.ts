import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiaChecklistComponent } from './gia-checklist.component';

describe('GiaChecklistComponent', () => {
  let component: GiaChecklistComponent;
  let fixture: ComponentFixture<GiaChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiaChecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiaChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
