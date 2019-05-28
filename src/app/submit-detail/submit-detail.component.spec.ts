import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitDetailComponent } from './submit-detail.component';

describe('SubmitDetailComponent', () => {
  let component: SubmitDetailComponent;
  let fixture: ComponentFixture<SubmitDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
