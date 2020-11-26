import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubProcessComponent } from './add-sub-process.component';

describe('AddSubProcessComponent', () => {
  let component: AddSubProcessComponent;
  let fixture: ComponentFixture<AddSubProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSubProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
