import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeQprRequestsComponent } from './sme-qpr-requests.component';

describe('SmeQprRequestsComponent', () => {
  let component: SmeQprRequestsComponent;
  let fixture: ComponentFixture<SmeQprRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmeQprRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeQprRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
