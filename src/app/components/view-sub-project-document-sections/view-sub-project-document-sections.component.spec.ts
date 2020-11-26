import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubProjectDocumentSectionsComponent } from './view-sub-project-document-sections.component';

describe('ViewSubProjectDocumentSectionsComponent', () => {
  let component: ViewSubProjectDocumentSectionsComponent;
  let fixture: ComponentFixture<ViewSubProjectDocumentSectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSubProjectDocumentSectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSubProjectDocumentSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
