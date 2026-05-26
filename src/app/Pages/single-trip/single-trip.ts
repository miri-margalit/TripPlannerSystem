import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { trip } from '../../model/trip';
import { TripsService } from '../../services/TripsService';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-trip',
  imports: [],
  templateUrl: './single-trip.html',
  styleUrl: './single-trip.css',
})
export class SingleTrip {
  private route = inject(ActivatedRoute);
  private tripService = inject(TripsService);

  tripId = computed(() => Number(this.route.snapshot.paramMap.get('id')));

  trip = computed(() => this.tripService.getTripById(this.tripId()));
}
