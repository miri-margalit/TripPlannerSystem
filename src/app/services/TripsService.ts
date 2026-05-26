import { inject, Injectable, signal } from '@angular/core';
import { APIService } from './APIService';
import { Observable } from 'rxjs';
import { trip } from '../model/trip';

@Injectable({
  providedIn: 'root',
})
export class TripsService {
  private api = inject(APIService);

  allTrips = signal<trip[]>([]);
  singleTrip = signal<trip>({} as trip);
  error = signal<string>('');
  loading = signal<boolean>(false);

  getTrips() {
    this.loading.set(true);
    this.api.get<trip[]>('trips').subscribe({
      next: (res) => {
        this.allTrips.set(res);
      },
      error: (err) => {
        this.error.set('error with loading trips');
      },
    });
  }

  getTripById(tripId: Number) {
    this.api.get<trip>(`trips/${tripId}`).subscribe({
      next: (res) => {
        this.singleTrip.set(res);
      },
      error: (err) => {
        this.error.set('couldnt find this trip');
      },
    });
  }

  addTrip(trip: trip) {
    return this.api.post('trips', trip);
  }

  updateTrip(trip: trip) {
    return this.api.put(`trips/${trip.id}`, trip);
  }

  deleteTrip(tripId: Number) {
    return this.api.delete(`trips/${tripId}`);
  }
}
