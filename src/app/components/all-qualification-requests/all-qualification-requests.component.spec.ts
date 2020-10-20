import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllQualificationRequestsComponent } from './all-qualification-requests.component';

describe('AllQualificationRequestsComponent', () => {
  let component: AllQualificationRequestsComponent;
  let fixture: ComponentFixture<AllQualificationRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllQualificationRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllQualificationRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
