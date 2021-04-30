import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrcActionsComponent } from './grc-actions.component';

describe('GrcActionsComponent', () => {
  let component: GrcActionsComponent;
  let fixture: ComponentFixture<GrcActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrcActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrcActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
