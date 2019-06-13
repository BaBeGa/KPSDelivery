import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverworkhistoryPage } from './driverworkhistory.page';

describe('DriverworkhistoryPage', () => {
  let component: DriverworkhistoryPage;
  let fixture: ComponentFixture<DriverworkhistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverworkhistoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverworkhistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
