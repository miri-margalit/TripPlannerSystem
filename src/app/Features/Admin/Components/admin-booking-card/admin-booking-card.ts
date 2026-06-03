import { Component, computed, inject, input, signal } from '@angular/core';
import { booking } from '../../../../model/booking';
import { TripService } from '../../Services/TripService';
import { UserService } from '../../Services/UserService';
import { BookingService } from '../../Services/BookingServices';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-booking-card',
  imports: [FormsModule],
  templateUrl: './admin-booking-card.html',
  styleUrl: './admin-booking-card.css',
})
export class AdminBookingCard {
  private userService = inject(UserService);
  private tripService = inject(TripService);
  private bookingService = inject(BookingService);

  booking = input<booking>({} as booking);
  isEditOpen = signal(false);
  isDeleteOpen = signal(false);
  editPeople = signal(1);

  userName = computed(
    () =>
      this.userService.allUsers().find((u) => String(u.id) === String(this.booking().userId))
        ?.name ?? 'Unknown User',
  );

  tripName = computed(
    () =>
      this.tripService.allTrips().find((t) => String(t.id) === String(this.booking().tripId))
        ?.name ?? 'Unknown Trip',
  );

  onEditClick() {
    this.editPeople.set(this.booking().people);
    this.isEditOpen.set(true);
  }

  onSaveEdit() {
    this.bookingService.updateBookingById(this.booking().id, {
      ...this.booking(),
      people: this.editPeople(),
    });
    this.isEditOpen.set(false);
  }

  onDeleteClick() {
    this.isDeleteOpen.set(true);
  }

  onConfirmDelete() {
    this.bookingService.deleteBooking(this.booking().id);
    this.isDeleteOpen.set(false);
  }

  onCancel() {
    this.isEditOpen.set(false);
    this.isDeleteOpen.set(false);
  }
}
