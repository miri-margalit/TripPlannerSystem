import { inject, Injectable } from '@angular/core';
import { APIService } from './APIService';
import { map, Observable } from 'rxjs';
import { booking } from '../model/booking';

@Injectable({
  providedIn: 'root',
})
export class bookingService {
  private api = inject(APIService);

  getAllBooking(): Observable<booking[]> {
    return this.api.get<booking[]>('booking');
  }

  addBooking(booking: booking) {
    return this.api.post<booking>('booking', booking);
  }

  getAllBookingByUserId(userId: Number) {
    return this.getAllBooking().pipe(
      map((bookings) => bookings.filter((booking) => booking.userId === userId)),
    );
  }
}
