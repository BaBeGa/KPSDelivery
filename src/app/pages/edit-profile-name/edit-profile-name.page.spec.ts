import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileNamePage } from './edit-profile-name.page';

describe('EditProfileNamePage', () => {
  let component: EditProfileNamePage;
  let fixture: ComponentFixture<EditProfileNamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProfileNamePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileNamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
