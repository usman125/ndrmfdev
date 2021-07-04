import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QprToDonorComponent } from './qpr-to-donor.component';

describe('QprToDonorComponent', () => {
  let component: QprToDonorComponent;
  let fixture: ComponentFixture<QprToDonorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QprToDonorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QprToDonorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
