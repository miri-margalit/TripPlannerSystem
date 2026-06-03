import { Component, inject, OnInit } from '@angular/core';
import { BookingService } from '../../Services/BookingServices';
import { AdminBookingCard } from '../../Components/admin-booking-card/admin-booking-card';
import { UserService } from '../../Services/UserService';
import { TripService } from '../../Services/TripService';

@Component({
  selector: 'app-admin-booking',
  imports: [AdminBookingCard],
  templateUrl: './admin-booking.html',
  styleUrl: './admin-booking.css',
})
export class AdminBooking implements OnInit {
  private bookingService = inject(BookingService);
  private userService = inject(UserService);
  private tripService = inject(TripService);

  allBookings = this.bookingService.allBooking;

  ngOnInit(): void {
    this.bookingService.getAllBooking();
    this.userService.getAllUsers();
    this.tripService.getAllTrips();
  }
}
