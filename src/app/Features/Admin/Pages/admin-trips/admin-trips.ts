import { Component, inject, OnInit } from '@angular/core';
import { TripService } from '../../Services/TripService';
import { AdminTripCard } from '../../Components/admin-trip-card/admin-trip-card';
import { BookingService } from '../../Services/BookingServices';

@Component({
  selector: 'app-admin-trips',
  imports: [AdminTripCard],
  templateUrl: './admin-trips.html',
  styleUrl: './admin-trips.css',
})
export class AdminTrips implements OnInit {
  private tripService = inject(TripService);
  private bookingService = inject(BookingService);

  allTrips = this.tripService.allTrips;
  selectedTrip = this.tripService.selectedTrip;

  ngOnInit(): void {
    this.tripService.getAllTrips();
    this.bookingService.getAllBooking();
  }
}
