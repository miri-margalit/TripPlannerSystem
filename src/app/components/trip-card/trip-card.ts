import { Component, inject, input, output, signal } from '@angular/core';
import { trip } from '../../model/trip';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { booking } from '../../model/booking';

@Component({
  selector: 'app-trip-card',
  imports: [RouterLink],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css',
})
export class TripCard {
  trip = input<trip>();
  mode = input<'my' | 'all'>('all');
  bookingId = input<string>();

  private router = inject(Router);

  goToBooking() {
    if (!this.bookingId()) return;

    this.router.navigate(['/home/my-trips', this.bookingId()]);
  }
}
