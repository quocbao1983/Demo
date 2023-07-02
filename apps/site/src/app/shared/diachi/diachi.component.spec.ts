/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DiachiComponent } from './diachi.component';

describe('DiachiComponent', () => {
  let component: DiachiComponent;
  let fixture: ComponentFixture<DiachiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiachiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiachiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
