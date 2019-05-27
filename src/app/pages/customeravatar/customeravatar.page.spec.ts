import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomeravatarPage } from './customeravatar.page';

describe('CustomeravatarPage', () => {
  let component: CustomeravatarPage;
  let fixture: ComponentFixture<CustomeravatarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomeravatarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomeravatarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
