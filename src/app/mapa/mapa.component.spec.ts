import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MapaComponent} from './mapa.component';
import {expect} from "@angular/core/testing/src/testing_internal";
import {describe} from "jasmine";

describe('MapaComponent', () => {
  let component: MapaComponent;
  let fixture: ComponentFixture<MapaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MapaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
