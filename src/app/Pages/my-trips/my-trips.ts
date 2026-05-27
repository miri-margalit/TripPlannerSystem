import { Component, computed, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/AuthService';
import { bookingService } from '../../services/bookingService';
import { BookedTripCard } from '../../components/booked-trip-card/booked-trip-card';

@Component({
  selector: 'app-my-trips',
  imports: [BookedTripCard],
  templateUrl: './my-trips.html',
  styleUrl: './my-trips.css',
})
export class MyTrips implements OnInit {
  private authService = inject(AuthService);
  private bookingService = inject(bookingService);

  logesUser = this.authService.currentUser;

  bookings = this.bookingService.allBookings;

  ngOnInit() {
    const id = this.logesUser()?.id;
    if (id) {
      this.bookingService.loadBookingsByUserId(id);
    }
  }
}
