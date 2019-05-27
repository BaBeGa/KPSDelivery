import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatedriverPage } from './ratedriver.page';

describe('RatedriverPage', () => {
  let component: RatedriverPage;
  let fixture: ComponentFixture<RatedriverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatedriverPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatedriverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
