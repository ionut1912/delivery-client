import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRestaurantsModalComponent } from './add-restaurants-modal.component';

describe('AddRestaurantsModalComponent', () => {
  let component: AddRestaurantsModalComponent;
  let fixture: ComponentFixture<AddRestaurantsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddRestaurantsModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddRestaurantsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
