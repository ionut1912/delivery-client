import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRestaurantsModalComponent } from './edit-restaurants-modal.component';

describe('EditRestaurantsModalComponent', () => {
  let component: EditRestaurantsModalComponent;
  let fixture: ComponentFixture<EditRestaurantsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditRestaurantsModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditRestaurantsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
