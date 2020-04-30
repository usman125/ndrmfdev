import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSmeComponent } from './edit-sme.component';

describe('EditSmeComponent', () => {
  let component: EditSmeComponent;
  let fixture: ComponentFixture<EditSmeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSmeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
