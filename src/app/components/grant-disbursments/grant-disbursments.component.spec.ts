import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrantDisbursmentsComponent } from './grant-disbursments.component';

describe('GrantDisbursmentsComponent', () => {
  let component: GrantDisbursmentsComponent;
  let fixture: ComponentFixture<GrantDisbursmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrantDisbursmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrantDisbursmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
