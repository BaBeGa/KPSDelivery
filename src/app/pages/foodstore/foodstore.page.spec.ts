import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodstorePage } from './foodstore.page';

describe('FoodstorePage', () => {
  let component: FoodstorePage;
  let fixture: ComponentFixture<FoodstorePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodstorePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodstorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
