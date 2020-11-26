import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoHeaderLayoutComponent } from './no-header-layout.component';

describe('NoHeaderLayoutComponent', () => {
  let component: NoHeaderLayoutComponent;
  let fixture: ComponentFixture<NoHeaderLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoHeaderLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoHeaderLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
