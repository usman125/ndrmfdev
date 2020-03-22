import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalSectionsComponent } from './proposal-sections.component';

describe('ProposalSectionsComponent', () => {
  let component: ProposalSectionsComponent;
  let fixture: ComponentFixture<ProposalSectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalSectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
