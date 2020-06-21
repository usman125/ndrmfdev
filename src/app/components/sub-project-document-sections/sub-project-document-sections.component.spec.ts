import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubProjectDocumentSectionsComponent } from './sub-project-document-sections.component';

describe('SubProjectDocumentSectionsComponent', () => {
  let component: SubProjectDocumentSectionsComponent;
  let fixture: ComponentFixture<SubProjectDocumentSectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubProjectDocumentSectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubProjectDocumentSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
