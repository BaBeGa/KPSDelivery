import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodAddRemovePage } from './food-add-remove.page';

describe('FoodAddRemovePage', () => {
  let component: FoodAddRemovePage;
  let fixture: ComponentFixture<FoodAddRemovePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodAddRemovePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodAddRemovePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
