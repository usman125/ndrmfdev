import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplainantScreenComponent } from './complainant-screen.component';

describe('ComplainantScreenComponent', () => {
  let component: ComplainantScreenComponent;
  let fixture: ComponentFixture<ComplainantScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplainantScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplainantScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
