import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerorderdetailPage } from './customerorderdetail.page';

describe('CustomerorderdetailPage', () => {
  let component: CustomerorderdetailPage;
  let fixture: ComponentFixture<CustomerorderdetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerorderdetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerorderdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
