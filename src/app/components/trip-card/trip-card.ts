import { Component, inject, input, signal } from '@angular/core';
import { trip } from '../../model/trip';
import { RouterLink } from '@angular/router';
import { BookedTripCard } from '../booked-trip-card/booked-trip-card';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [RouterLink, BookedTripCard],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css',
})
export class TripCard {
  trip = input<trip>();
  mode = input<'my' | 'all'>('all');
  bookingId = input<string>();
  bookedTrip = input<any>();

  showDetails = signal<boolean>(false);

  goToBooking() {
    this.showDetails.set(true);
  }
}
