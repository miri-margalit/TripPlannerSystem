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

  loadBookingsByUserId(userId: any) {
  this.api
    .get<booking[]>('bookings')
    .subscribe((allBookings) => {
      const filtered = allBookings.filter((b) => String(b.userId) === String(userId));
      this.allBookings.set(filtered);
    });
}

}
