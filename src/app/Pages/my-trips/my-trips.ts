import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/AuthService';
import { bookingService } from '../../services/bookingService';
import { BookedTripCard } from '../../components/booked-trip-card/booked-trip-card';
import { TripCard } from '../../components/trip-card/trip-card';
import { TripsService } from '../../services/TripsService';

@Component({
  selector: 'app-my-trips',
  imports: [TripCard],
  templateUrl: './my-trips.html',
  styleUrl: './my-trips.css',
})
export class MyTrips {
  private authService = inject(AuthService);
  private bookingService = inject(bookingService);
  private tripsSetvice = inject(TripsService);

  logesUser = this.authService.currentUser;
  bookings = this.bookingService.allBookings;

  constructor() {
    effect(() => {
      const user = this.logesUser();

      if (!user?.id) return;

      this.bookingService.loadBookingsByUserId(user.id);
    });

    this.tripsSetvice.getTrips();
  }

  getTrip(bookingId: string) {
    return this.tripsSetvice.getTripById(bookingId);
  }

  removeBooking(id: string) {
    this.bookingService.allBookings.update((list) => list.filter((b) => b.id !== id));
  }
}
