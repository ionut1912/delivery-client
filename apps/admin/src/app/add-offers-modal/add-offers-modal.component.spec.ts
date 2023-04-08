import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOffersModalComponent } from './add-offers-modal.component';

describe('AddOffersModalComponent', () => {
  let component: AddOffersModalComponent;
  let fixture: ComponentFixture<AddOffersModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddOffersModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddOffersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
