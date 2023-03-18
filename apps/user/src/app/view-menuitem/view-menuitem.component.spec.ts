import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMenuitemComponent } from './view-menuitem.component';

describe('ViewMenuitemComponent', () => {
  let component: ViewMenuitemComponent;
  let fixture: ComponentFixture<ViewMenuitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewMenuitemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewMenuitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
