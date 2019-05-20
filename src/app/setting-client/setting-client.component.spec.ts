import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingClientComponent } from './setting-client.component';

describe('SettingClientComponent', () => {
  let component: SettingClientComponent;
  let fixture: ComponentFixture<SettingClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
