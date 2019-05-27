import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerprofilePage } from './customerprofile.page';

describe('CustomerprofilePage', () => {
  let component: CustomerprofilePage;
  let fixture: ComponentFixture<CustomerprofilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerprofilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
