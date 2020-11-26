import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignToConcernPersonComponent } from './assign-to-concern-person.component';

describe('AssignToConcernPersonComponent', () => {
  let component: AssignToConcernPersonComponent;
  let fixture: ComponentFixture<AssignToConcernPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignToConcernPersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignToConcernPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
