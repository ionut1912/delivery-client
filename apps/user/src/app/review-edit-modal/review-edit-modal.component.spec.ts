import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewEditModalComponent } from './review-edit-modal.component';

describe('ReviewEditModalComponent', () => {
  let component: ReviewEditModalComponent;
  let fixture: ComponentFixture<ReviewEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewEditModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
