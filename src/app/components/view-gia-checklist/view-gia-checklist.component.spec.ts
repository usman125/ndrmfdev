import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGiaChecklistComponent } from './view-gia-checklist.component';

describe('ViewGiaChecklistComponent', () => {
  let component: ViewGiaChecklistComponent;
  let fixture: ComponentFixture<ViewGiaChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewGiaChecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGiaChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
