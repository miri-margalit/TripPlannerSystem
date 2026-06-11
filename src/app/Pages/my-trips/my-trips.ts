import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from '../../services/AuthService';
import { bookingService } from '../../services/bookingService';
import { TripCard } from '../../components/trip-card/trip-card';
import { TripsService } from '../../services/TripsService';

@Component({
  selector: 'app-my-trips',
  standalone: true,
  imports: [TripCard],
  templateUrl: './my-trips.html',
  styleUrl: './my-trips.css',
})
export class MyTrips {
  private authService = inject(AuthService);
  private bookingService = inject(bookingService);
  private tripsService = inject(TripsService);

  bookings = this.bookingService.allBookings;
  allTrips = this.tripsService.allTrips;

  bookedTripsDetailed = computed(() => {
    const currentBookings = this.bookings();
    const tripsList = this.allTrips();
    
    if (currentBookings.length === 0 || tripsList.length === 0) return [];

    return currentBookings.map(booking => {
      const foundTrip = tripsList.find(t => String(t.id) === String(booking.tripId));
      return {
        bookingId: booking.id,
        bookingData: booking,
        trip: foundTrip
      };
    }).filter(item => item.trip !== undefined);
  });

  constructor() {
    effect(() => {
      const user = this.authService.currentUser();
      if (!user?.id) return;
      this.bookingService.loadBookingsByUserId(user.id);
    });

    this.tripsService.getTrips();
  }

  removeBooking(id: string) {
    this.bookingService.allBookings.update((list) => list.filter((b) => b.id !== id));
  }
}
