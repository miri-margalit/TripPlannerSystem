import { Component, computed, inject, input, output } from '@angular/core';
import { booking } from '../../model/booking';
import { TripsService } from '../../services/TripsService';
import { APIService } from '../../services/APIService';

@Component({
  selector: 'app-booked-trip-card',
  imports: [],
  templateUrl: './booked-trip-card.html',
  styleUrl: './booked-trip-card.css',
})
export class BookedTripCard {
  private tripService = inject(TripsService);
  private apiService = inject(APIService);


  bookedTrip = input<booking>();
  bookingCanceled = output<void>();


  trip = computed(() => {
    const booking = this.bookedTrip();

    if (!booking) return null;

    return this.tripService.getTripById(booking.tripId);
  });
  cancelBooking() {
  const bookingId = this.bookedTrip()?.id;

  if (!bookingId) return;
  this.apiService.delete(`bookings/${bookingId}`).subscribe({
    next: () => {
      console.log('ההזמנה בוטלה ונמחקה מהשרת בהצלחה!');
      this.bookingCanceled.emit();

    },
    error: (err) => console.error('שגיאה בזמן ביטול ההזמנה:', err)
  });

}

}
