import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitHistoryComponent } from './submit-history.component';

describe('SubmitHistoryComponent', () => {
  let component: SubmitHistoryComponent;
  let fixture: ComponentFixture<SubmitHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
