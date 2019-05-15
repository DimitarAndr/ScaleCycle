import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiosComponent } from './premios.component';

describe('PremiosComponent', () => {
  let component: PremiosComponent;
  let fixture: ComponentFixture<PremiosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremiosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
