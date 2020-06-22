import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillSubProjectDocumentSectionsComponent } from './fill-sub-project-document-sections.component';

describe('FillSubProjectDocumentSectionsComponent', () => {
  let component: FillSubProjectDocumentSectionsComponent;
  let fixture: ComponentFixture<FillSubProjectDocumentSectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillSubProjectDocumentSectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillSubProjectDocumentSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
