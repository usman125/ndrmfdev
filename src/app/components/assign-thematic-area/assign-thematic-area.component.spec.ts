import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignThematicAreaComponent } from './assign-thematic-area.component';

describe('AssignThematicAreaComponent', () => {
  let component: AssignThematicAreaComponent;
  let fixture: ComponentFixture<AssignThematicAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignThematicAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignThematicAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
