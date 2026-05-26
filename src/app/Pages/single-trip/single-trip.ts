import { Component, inject, input, OnInit, signal } from '@angular/core';
import { trip } from '../../model/trip';
import { TripsService } from '../../services/TripsService';

@Component({
  selector: 'app-single-trip',
  imports: [],
  templateUrl: './single-trip.html',
  styleUrl: './single-trip.css',
})
export class SingleTrip implements OnInit {
  tripId = input<any>();
  singleTrip = signal<trip>({} as trip);
  private tripService = inject(TripsService);

  ngOnInit() {
    this.tripService.getTripById(this.tripId());
  }
}
