import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingSignupsComponent } from './pending-signups.component';

describe('PendingSignupsComponent', () => {
  let component: PendingSignupsComponent;
  let fixture: ComponentFixture<PendingSignupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingSignupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingSignupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
