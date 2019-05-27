import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfilePasswordPage } from './edit-profile-password.page';

describe('EditProfilePasswordPage', () => {
  let component: EditProfilePasswordPage;
  let fixture: ComponentFixture<EditProfilePasswordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProfilePasswordPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfilePasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
