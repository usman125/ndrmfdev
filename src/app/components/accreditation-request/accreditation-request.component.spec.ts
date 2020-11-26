import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccreditationRequestComponent } from './accreditation-request.component';

describe('AccreditationRequestComponent', () => {
  let component: AccreditationRequestComponent;
  let fixture: ComponentFixture<AccreditationRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccreditationRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccreditationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
