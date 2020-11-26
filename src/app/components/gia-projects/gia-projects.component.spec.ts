import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiaProjectsComponent } from './gia-projects.component';

describe('GiaProjectsComponent', () => {
  let component: GiaProjectsComponent;
  let fixture: ComponentFixture<GiaProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiaProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiaProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
