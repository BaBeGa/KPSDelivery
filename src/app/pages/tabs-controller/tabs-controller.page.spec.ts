import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsControllerPage } from './tabs-controller.page';

describe('TabsControllerPage', () => {
  let component: TabsControllerPage;
  let fixture: ComponentFixture<TabsControllerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsControllerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsControllerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
