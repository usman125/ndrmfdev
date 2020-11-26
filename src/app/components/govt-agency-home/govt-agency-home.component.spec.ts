import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GovtAgencyHomeComponent } from './govt-agency-home.component';

describe('GovtAgencyHomeComponent', () => {
  let component: GovtAgencyHomeComponent;
  let fixture: ComponentFixture<GovtAgencyHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GovtAgencyHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GovtAgencyHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
