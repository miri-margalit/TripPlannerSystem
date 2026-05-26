import { Component, inject, input, signal } from '@angular/core';
import { trip } from '../../model/trip';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { TripsService } from '../../services/TripsService';

@Component({
  selector: 'app-trip-card',
  imports: [RouterLink],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css',
})
export class TripCard {
  trip = input<trip>();
}
