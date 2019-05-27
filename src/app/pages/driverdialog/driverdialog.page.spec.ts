import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverdialogPage } from './driverdialog.page';

describe('DriverdialogPage', () => {
  let component: DriverdialogPage;
  let fixture: ComponentFixture<DriverdialogPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverdialogPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverdialogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
