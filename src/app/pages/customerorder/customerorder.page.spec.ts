import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerorderPage } from './customerorder.page';

describe('CustomerorderPage', () => {
  let component: CustomerorderPage;
  let fixture: ComponentFixture<CustomerorderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerorderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerorderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
