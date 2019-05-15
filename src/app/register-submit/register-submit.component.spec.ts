import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSubmitComponent } from './register-submit.component';

describe('RegisterSubmitComponent', () => {
  let component: RegisterSubmitComponent;
  let fixture: ComponentFixture<RegisterSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterSubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
