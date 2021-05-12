import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfAllComplainsComponent } from './list-of-all-complains.component';

describe('ListOfAllComplainsComponent', () => {
  let component: ListOfAllComplainsComponent;
  let fixture: ComponentFixture<ListOfAllComplainsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfAllComplainsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfAllComplainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
