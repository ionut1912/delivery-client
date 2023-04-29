import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsReviewsComponent } from './items-reviews.component';

describe('ItemsReviewsComponent', () => {
  let component: ItemsReviewsComponent;
  let fixture: ComponentFixture<ItemsReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemsReviewsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemsReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
