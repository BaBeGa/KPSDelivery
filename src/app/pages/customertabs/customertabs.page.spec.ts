import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomertabsPage } from './customertabs.page';

describe('CustomertabsPage', () => {
  let component: CustomertabsPage;
  let fixture: ComponentFixture<CustomertabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomertabsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomertabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
