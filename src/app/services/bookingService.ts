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

    loadBookingsByUserId(userId: any) {
    this.api.get<booking[]>('bookings').subscribe((allBookings) => {
      console.log('API RESPONSE:', allBookings);

      const filtered = allBookings.filter((b) => {
        if (!b.userId || !userId) return false;
        return String(b.userId).toLowerCase().trim() === String(userId).toLowerCase().trim();
      });

      console.log('filtered Bookings:', filtered);
      this.allBookings.set(filtered);
    });
  }

}
