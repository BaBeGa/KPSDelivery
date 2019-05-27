import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpcenterPage } from './helpcenter.page';

describe('HelpcenterPage', () => {
  let component: HelpcenterPage;
  let fixture: ComponentFixture<HelpcenterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpcenterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpcenterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
