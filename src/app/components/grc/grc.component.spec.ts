import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GRCComponent } from './grc.component';

describe('GRCComponent', () => {
  let component: GRCComponent;
  let fixture: ComponentFixture<GRCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GRCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GRCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
