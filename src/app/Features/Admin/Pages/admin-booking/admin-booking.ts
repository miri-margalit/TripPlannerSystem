import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { BookingService } from '../../Services/BookingServices';
import { AdminBookingCard } from '../../Components/admin-booking-card/admin-booking-card';
import { UserService } from '../../Services/UserService';
import { TripService } from '../../Services/TripService';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-booking',
  imports: [AdminBookingCard, FormsModule],
  templateUrl: './admin-booking.html',
  styleUrl: './admin-booking.css',
})
export class AdminBooking implements OnInit {
  private bookingService = inject(BookingService);
  private userService = inject(UserService);
  private tripService = inject(TripService);

  allBookings = this.bookingService.allBooking;
  searchId = signal('');
  searchName = signal('');

  filteredBookings = computed(() => {
    let bookings = this.allBookings();
    const id = this.searchId().toLowerCase().trim();
    const name = this.searchName().toLowerCase().trim();

    if (id) {
      bookings = bookings.filter((b) => String(b.id).toLowerCase().includes(id));
    }
    if (name) {
      bookings = bookings.filter((b) => {
        const user = this.userService.allUsers().find((u) => String(u.id) === String(b.userId));
        return user?.name.toLowerCase().includes(name);
      });
    }
    return bookings;
  });

  ngOnInit(): void {
    this.bookingService.getAllBooking();
    this.userService.getAllUsers();
    this.tripService.getAllTrips();
  }
}
