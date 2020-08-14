import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageProductsComponent } from './main-page-products.component';

describe('MainPageProductsComponent', () => {
  let component: MainPageProductsComponent;
  let fixture: ComponentFixture<MainPageProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPageProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
