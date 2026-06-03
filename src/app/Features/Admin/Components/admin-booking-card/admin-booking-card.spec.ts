import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBookingCard } from './admin-booking-card';

describe('AdminBookingCard', () => {
  let component: AdminBookingCard;
  let fixture: ComponentFixture<AdminBookingCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBookingCard],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminBookingCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
