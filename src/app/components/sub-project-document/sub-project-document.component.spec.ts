import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubProjectDocumentComponent } from './sub-project-document.component';

describe('SubProjectDocumentComponent', () => {
  let component: SubProjectDocumentComponent;
  let fixture: ComponentFixture<SubProjectDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubProjectDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubProjectDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
