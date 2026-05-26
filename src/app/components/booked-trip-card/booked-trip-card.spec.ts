import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedTripCard } from './booked-trip-card';

describe('BookedTripCard', () => {
  let component: BookedTripCard;
  let fixture: ComponentFixture<BookedTripCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookedTripCard],
    }).compileComponents();

    fixture = TestBed.createComponent(BookedTripCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
