import { inject, Injectable, signal } from '@angular/core';
import { APIService } from '../../../services/APIService';
import { booking, BookingDetails } from '../../../model/booking';
import { TripService } from './TripService';
import { UserService } from './UserService';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private api = inject(APIService);
  private tripService = inject(TripService);
  private userService = inject(UserService);
  error = signal<string>('');
  loading = signal<boolean>(false);
  allBooking = signal<booking[]>([]);
  selectedBooking = signal<booking>({} as booking);

  getAllBooking() {
    this.loading.set(true);

    this.api.get<booking[]>('bookings').subscribe({
      next: (data) => {
        console.log('bookings loaded:', data);
        this.allBooking.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load bookings');
        this.loading.set(false);
      },
    });
  }

  getBookingById(bookingId: string) {
    this.api.get<booking>(`bookings/${bookingId}`).subscribe({
      next: (data) => this.selectedBooking.set(data),
      error: (err) => this.error.set('Failed to load selected booking'),
    });
  }

  updateBookingById(bookingId: string, booking: booking) {
    this.api.put<booking>(`bookings/${bookingId}`, booking).subscribe({
      next: (data) => {
        this.allBooking.update((bookings) => bookings.map((b) => (b.id === bookingId ? data : b)));
      },
      error: (err) => this.error.set('Failed to update selected booking'),
    });
  }

  getTotalParticipantsByTripId(tripId: string): number {
    console.log('allBookings:', this.allBooking());
    console.log('tripId מחפשים:', tripId);
    console.log(
      'bookings של הטיול:',
      this.allBooking().filter((b) => String(b.tripId) === String(tripId)),
    );
    return this.allBooking()
      .filter((b) => String(b.tripId) === String(tripId))
      .reduce((sum, b) => sum + b.people, 0);
  }

  deleteBooking(bookingId: string) {
    this.api.delete(`bookings/${bookingId}`).subscribe({
      next: () => {
        this.allBooking.update((bookings) => bookings.filter((b) => b.id !== bookingId));
      },
      error: (err) => this.error.set('Failed to delete the selected booking'),
    });
  }

  getBookingDetails(bookingId: string): BookingDetails | null {
    const booking = this.allBooking().find((b) => b.id === bookingId);
    if (!booking) return null;

    const trip = this.tripService.allTrips().find((t) => t.id === booking.tripId);
    const user = this.userService.selectedUser();

    return {
      booking,
      tripName: trip?.name ?? 'Unknown Trip',
      userName: user?.name ?? 'Unknown User',
      people: booking.people,
    };
  }
}
