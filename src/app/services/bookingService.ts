import { inject, Injectable, signal } from '@angular/core';
import { APIService } from './APIService';
import { map, Observable } from 'rxjs';
import { booking } from '../model/booking';

@Injectable({
  providedIn: 'root',
})
export class bookingService {
  private api = inject(APIService);

  allBookings = signal<booking[]>([]);

  getAllBooking(): Observable<booking[]> {
    return this.api.get<booking[]>('bookings');
  }

  addBooking(booking: booking) {
    return this.api.post<booking>('bookings', booking);
  }

  loadBookingsByUserId(userId: number) {
    this.api
      .get<booking[]>('bookings')
      .pipe(map((bookings) => bookings.filter((b) => b.userId === userId)))
      .subscribe((filtered) => {
        this.allBookings.set(filtered);
      });
  }
}
