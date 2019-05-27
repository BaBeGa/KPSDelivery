import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileAddressPage } from './edit-profile-address.page';

describe('EditProfileAddressPage', () => {
  let component: EditProfileAddressPage;
  let fixture: ComponentFixture<EditProfileAddressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProfileAddressPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileAddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
