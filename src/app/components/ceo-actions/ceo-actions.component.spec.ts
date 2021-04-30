import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeoActionsComponent } from './ceo-actions.component';

describe('CeoActionsComponent', () => {
  let component: CeoActionsComponent;
  let fixture: ComponentFixture<CeoActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CeoActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CeoActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
