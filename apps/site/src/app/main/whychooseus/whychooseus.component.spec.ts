/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WhychooseusComponent } from './whychooseus.component';

describe('WhychooseusComponent', () => {
  let component: WhychooseusComponent;
  let fixture: ComponentFixture<WhychooseusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhychooseusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhychooseusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
