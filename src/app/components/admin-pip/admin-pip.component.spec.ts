import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPipComponent } from './admin-pip.component';

describe('AdminPipComponent', () => {
  let component: AdminPipComponent;
  let fixture: ComponentFixture<AdminPipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
