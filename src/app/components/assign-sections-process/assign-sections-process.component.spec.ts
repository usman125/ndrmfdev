import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignSectionsProcessComponent } from './assign-sections-process.component';

describe('AssignSectionsProcessComponent', () => {
  let component: AssignSectionsProcessComponent;
  let fixture: ComponentFixture<AssignSectionsProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignSectionsProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignSectionsProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
