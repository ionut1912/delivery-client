import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuitemsPhotosComponent } from './menuitems-photos.component';

describe('MenuitemsPhotosComponent', () => {
  let component: MenuitemsPhotosComponent;
  let fixture: ComponentFixture<MenuitemsPhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuitemsPhotosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuitemsPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
