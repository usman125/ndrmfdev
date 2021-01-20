import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGrantDisbursmentComponent } from './view-grant-disbursment.component';

describe('ViewGrantDisbursmentComponent', () => {
  let component: ViewGrantDisbursmentComponent;
  let fixture: ComponentFixture<ViewGrantDisbursmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewGrantDisbursmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGrantDisbursmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
