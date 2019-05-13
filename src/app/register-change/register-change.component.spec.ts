import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterChangeComponent } from './register-change.component';

describe('RegisterChangeComponent', () => {
  let component: RegisterChangeComponent;
  let fixture: ComponentFixture<RegisterChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
