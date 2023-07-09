/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NgonnguComponent } from './ngonngu.component';

describe('NgonnguComponent', () => {
  let component: NgonnguComponent;
  let fixture: ComponentFixture<NgonnguComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgonnguComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgonnguComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
