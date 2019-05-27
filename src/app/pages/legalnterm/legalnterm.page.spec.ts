import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalntermPage } from './legalnterm.page';

describe('LegalntermPage', () => {
  let component: LegalntermPage;
  let fixture: ComponentFixture<LegalntermPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegalntermPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalntermPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
