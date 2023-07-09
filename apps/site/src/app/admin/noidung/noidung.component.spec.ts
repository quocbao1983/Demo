/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NoidungComponent } from './noidung.component';

describe('NoidungComponent', () => {
  let component: NoidungComponent;
  let fixture: ComponentFixture<NoidungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoidungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoidungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
