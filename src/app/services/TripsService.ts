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
  error = signal<string>('');
  loading = signal<boolean>(false);

  getTrips() {
    this.loading.set(true);
    this.api.get<trip[]>('trips').subscribe({
      next: (res) => {
        this.allTrips.set(res);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('error with loading trips');
        this.loading.set(false);
      },
    });
  }

  getTripById(id: number) {
   return this.allTrips().find((t) => t.id === id);
  }

  addTrip(trip: trip) {
    return this.api.post('trips', trip);
  }

  updateTrip(trip: trip) {
    return this.api.put(`trips/${trip.id}`, trip);
  }

  deleteTrip(tripId: number) {
    return this.api.delete(`trips/${tripId}`);
  }
}
