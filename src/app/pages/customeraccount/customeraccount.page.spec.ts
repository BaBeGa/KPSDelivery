import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomeraccountPage } from './customeraccount.page';

describe('CustomeraccountPage', () => {
  let component: CustomeraccountPage;
  let fixture: ComponentFixture<CustomeraccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomeraccountPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomeraccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
