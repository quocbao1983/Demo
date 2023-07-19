/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CaidatComponent } from './caidat.component';

describe('CaidatComponent', () => {
  let component: CaidatComponent;
  let fixture: ComponentFixture<CaidatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaidatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
