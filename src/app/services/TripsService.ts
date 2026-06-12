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

  getTripById(id: string) {
    const trips = this.allTrips();
    return trips.find((t) => String(t.id) === String(id));
  }
}
