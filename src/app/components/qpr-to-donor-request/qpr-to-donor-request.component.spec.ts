import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QprToDonorRequestComponent } from './qpr-to-donor-request.component';

describe('QprToDonorRequestComponent', () => {
  let component: QprToDonorRequestComponent;
  let fixture: ComponentFixture<QprToDonorRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QprToDonorRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QprToDonorRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
