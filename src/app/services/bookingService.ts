import { inject, Injectable, signal } from '@angular/core';
import { APIService } from './APIService';
import { Observable } from 'rxjs';
import { booking } from '../model/booking';

@Injectable({
  providedIn: 'root',
})
export class bookingService {
  private api = inject(APIService);

  allBookings = signal<booking[]>([]);
  bookingSuccess = signal(false);

  getAllBooking(): Observable<booking[]> {
    return this.api.get<booking[]>('bookings');
  }

  addBooking(booking: booking) {
    return this.api.post<booking>('bookings', booking);
  }

  loadBookingsByUserId(userId: string) {
    this.api.get<booking[]>('bookings').subscribe((allBookings) => {
      console.log('API RESPONSE:', allBookings);

      const filtered = allBookings.filter((b) => String(b.userId) === String(userId));

      console.log('filtered Bookings:', filtered);

      this.allBookings.set(filtered);
    });
  }
}
