import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QprSectionsComponent } from './qpr-sections.component';

describe('QprSectionsComponent', () => {
  let component: QprSectionsComponent;
  let fixture: ComponentFixture<QprSectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QprSectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QprSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
