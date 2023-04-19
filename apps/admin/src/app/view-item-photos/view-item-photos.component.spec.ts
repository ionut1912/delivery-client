import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewItemPhotosComponent } from './view-item-photos.component';

describe('ViewItemPhotosComponent', () => {
  let component: ViewItemPhotosComponent;
  let fixture: ComponentFixture<ViewItemPhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewItemPhotosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewItemPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
