import { Component, inject, input, output } from '@angular/core';
import { booking } from '../../model/booking';
import { APIService } from '../../services/APIService';
import { bookingService } from '../../services/bookingService';

@Component({
  selector: 'app-booked-trip-card',
  standalone: true,
  imports: [],
  templateUrl: './booked-trip-card.html',
  styleUrl: './booked-trip-card.css',
})
export class BookedTripCard {
  private apiService = inject(APIService);
  private bookingService = inject(bookingService);

  bookedTrip = input<booking>();
  trip = input<any>();
  bookingCanceled = output<void>();

<<<<<<< HEAD
=======
  trip = computed(() => {
    const booking = this.bookedTrip();

    if (!booking) return null;

    return this.tripService.getTripById(String(booking.tripId) as any);
  });

  showDeleteConfirm = false;

  openDeleteConfirm() {
    this.showDeleteConfirm = true;
  }

  closeDeleteConfirm() {
    this.showDeleteConfirm = false;
  }

>>>>>>> aad6b206963738e1be35ae48282c2170c061cb07
  cancelBooking() {
    const bookingId = this.bookedTrip()?.id;
    if (!bookingId) return;

    this.apiService.delete(`bookings/${bookingId}`).subscribe({
      next: () => {
<<<<<<< HEAD
        console.log('the order canceled, and removed from the server');
        this.bookingService.allBookings.update(list => list.filter(b => String(b.id) !== String(bookingId)));
=======
        this.showDeleteConfirm = false;
>>>>>>> aad6b206963738e1be35ae48282c2170c061cb07
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
      error: (err) => console.error(err),
    });
  }
}
