import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GovtAccreditRequestsComponent } from './govt-accredit-requests.component';

describe('GovtAccreditRequestsComponent', () => {
  let component: GovtAccreditRequestsComponent;
  let fixture: ComponentFixture<GovtAccreditRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GovtAccreditRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GovtAccreditRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
