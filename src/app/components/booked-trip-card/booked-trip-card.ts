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

    return this.tripService.getTripById(String(booking.tripId) as any);
  });

  cancelBooking() {
    const bookingId = this.bookedTrip()?.id;

    if (!bookingId) return;
    this.apiService.delete(`bookings/${bookingId}`).subscribe({
      next: () => {
        console.log('the order cancle, and removed from the server');
        this.bookingCanceled.emit();
      },
      error: (err) => console.error('problems with deleting order', err),
    });
  }
  isEditingPeople: boolean = false;

  people: number = 0;

  editPeople() {
    this.isEditingPeople = true;

    this.people = this.bookedTrip()?.people || 0;
  }

  increasePeople() {
    this.people++;
  }

  decreasePeople() {
    if (this.people > 0) {
      this.people--;
    }
  }

  savePeople() {
    const booking = this.bookedTrip();

    if (!booking) return;

    const updatedBooking = {
      ...booking,
      people: this.people,
    };

    this.apiService.put(`bookings/${booking.id}`, updatedBooking).subscribe({
      next: () => {
        booking.people = this.people;
        this.isEditingPeople = false;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
