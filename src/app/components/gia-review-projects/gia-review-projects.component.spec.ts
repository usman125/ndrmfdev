import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiaReviewProjectsComponent } from './gia-review-projects.component';

describe('GiaReviewProjectsComponent', () => {
  let component: GiaReviewProjectsComponent;
  let fixture: ComponentFixture<GiaReviewProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiaReviewProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiaReviewProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
