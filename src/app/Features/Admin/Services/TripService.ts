import { inject, Injectable, signal } from '@angular/core';
import { APIService } from '../../../services/APIService';
import { trip } from '../../../model/trip';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  private api = inject(APIService);
  allTrips = signal<trip[]>([]);
  selectedTrip = signal<trip>({} as trip);
  loading = signal<boolean>(false);
  error = signal<string>('');

  getAllTrips() {
    this.loading.set(true);

    this.api.get<trip[]>('trips').subscribe({
      next: (data) => {
        this.allTrips.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load trips');
        this.loading.set(false);
      },
    });
  }

  getTripById(tripId: string) {
    this.api.get<trip>(`trips/${tripId}`).subscribe({
      next: (data) => this.selectedTrip.set(data),
      error: (err) => this.error.set('Failed to load selected trip'),
    });
  }

  updateTripById(tripId: string, trip: trip) {
    this.api.put<trip>(`trips/${tripId}`, trip).subscribe({
      next: (data) => {
        this.allTrips.update((trips) => trips.map((t) => (t.id === tripId ? data : t)));
      },
      error: (err) => this.error.set('Failed to update trip'),
    });
  }

  deleteTrip(tripId: string) {
    this.api.delete(`trips/${tripId}`).subscribe({
      next: () => {
        this.allTrips.update((trips) => trips.filter((t) => t.id !== tripId));
      },
      error: (err) => this.error.set('Failed to delete selected trip'),
    });
  }

  
}
