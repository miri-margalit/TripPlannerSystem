import { Component, inject, OnInit, signal } from '@angular/core';
import { TripsService } from '../../services/TripsService';
import { TripCard } from '../../components/trip-card/trip-card';
import { trip } from '../../model/trip';
import { bookingService } from '../../services/bookingService';
import { AuthService } from '../../services/AuthService';

@Component({
  selector: 'app-all-trips',
  imports: [TripCard],
  templateUrl: './all-trips.html',
  styleUrl: './all-trips.css',
})
export class AllTrips implements OnInit {
  private tripService = inject(TripsService);

  trips = this.tripService.allTrips;

  ngOnInit(): void {
    this.tripService.getTrips();
  }
}
