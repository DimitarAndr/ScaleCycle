import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipateDetailComponent } from './participate-detail.component';

describe('ParticipateDetailComponent', () => {
  let component: ParticipateDetailComponent;
  let fixture: ComponentFixture<ParticipateDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipateDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipateDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
