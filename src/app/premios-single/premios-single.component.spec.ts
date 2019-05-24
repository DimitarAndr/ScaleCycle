import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiosSingleComponent } from './premios-single.component';

describe('PremiosSingleComponent', () => {
  let component: PremiosSingleComponent;
  let fixture: ComponentFixture<PremiosSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremiosSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiosSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
