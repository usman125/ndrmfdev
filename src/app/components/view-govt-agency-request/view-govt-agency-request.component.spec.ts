import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGovtAgencyRequestComponent } from './view-govt-agency-request.component';

describe('ViewGovtAgencyRequestComponent', () => {
  let component: ViewGovtAgencyRequestComponent;
  let fixture: ComponentFixture<ViewGovtAgencyRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewGovtAgencyRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGovtAgencyRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
