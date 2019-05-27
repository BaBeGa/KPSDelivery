import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodcenterPage } from './foodcenter.page';

describe('FoodcenterPage', () => {
  let component: FoodcenterPage;
  let fixture: ComponentFixture<FoodcenterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodcenterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodcenterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
