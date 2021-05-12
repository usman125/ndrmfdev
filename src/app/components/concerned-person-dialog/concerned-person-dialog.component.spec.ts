import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcernedPersonDialogComponent } from './concerned-person-dialog.component';

describe('ConcernedPersonDialogComponent', () => {
  let component: ConcernedPersonDialogComponent;
  let fixture: ComponentFixture<ConcernedPersonDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConcernedPersonDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcernedPersonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
