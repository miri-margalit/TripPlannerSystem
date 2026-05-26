import { Component, computed, inject, input } from '@angular/core';
import { booking } from '../../model/booking';
import { TripsService } from '../../services/TripsService';

@Component({
  selector: 'app-booked-trip-card',
  imports: [],
  templateUrl: './booked-trip-card.html',
  styleUrl: './booked-trip-card.css',
})
export class BookedTripCard {
  private tripService = inject(TripsService);

  bookedTrip = input<booking>();

  trip = computed(() => {
    const booking = this.bookedTrip();

    if (!booking) return null;

    return this.tripService.getTripById(booking.tripId);
  });
}
