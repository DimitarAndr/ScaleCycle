import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiosChildComponent } from './premios-child.component';

describe('PremiosChildComponent', () => {
  let component: PremiosChildComponent;
  let fixture: ComponentFixture<PremiosChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremiosChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiosChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
