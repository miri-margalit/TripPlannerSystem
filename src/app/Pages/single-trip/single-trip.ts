import { Component, computed, inject, OnInit } from '@angular/core';
import { TripsService } from '../../services/TripsService';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../../services/APIService';
import { AuthService } from '../../services/AuthService';
import { bookingService } from '../../services/bookingService';

@Component({
  selector: 'app-single-trip',
  standalone: true,
  imports: [],
  templateUrl: './single-trip.html',
  styleUrl: './single-trip.css',
})
export class SingleTrip {
  private route = inject(ActivatedRoute);
  private tripService = inject(TripsService);
  private apiService = inject(APIService);
  private router = inject(Router);
  private authService = inject(AuthService);
  private bookingService = inject(bookingService);

  user = this.authService.currentUser;
  bookings = this.bookingService.allBookings;
  people: number = 1;
  bookingSuccess = this.bookingService.bookingSuccess;

  increasePeople() {
    this.people++;
  }

  decreasePeople() {
    if (this.people > 0) {
      this.people--;
    }
  }

  tripId = computed(() => Number(this.route.snapshot.paramMap.get('id')));

  trip = computed(() => {
    return this.tripService.getTripById(String(this.tripId()));
  });

  bookTrip() {
    const currentTrip = this.trip();

    if (!currentTrip) {
      return;
    }

    const currentUserId = String(this.authService.currentUser()?.id);

    const newBooking = {
      tripId: String(currentTrip.id),
      userId: String(currentUserId),
      people: this.people,
    };

    console.log('the order is ready to send', newBooking);

    this.apiService.post('bookings', newBooking).subscribe({
      next: (response) => {
        console.log('the order have saved in the server', response);
        this.bookingService.bookingSuccess.set(true);

        const userId = String(this.authService.currentUser()?.id);
        this.bookingService.loadBookingsByUserId(userId);
      },
      error: (err) => {
        console.error('problem with saving the new order', err);
      },
    });
  }

  isUserBooked(tripId: string | number): boolean {
    const userId = this.user()?.id;

    return this.bookings().some(
      (b) => String(b.tripId) === String(tripId) && String(b.userId) === String(userId),
    );
  }

  closePopup() {
    this.bookingService.bookingSuccess.set(false);
    this.router.navigate(['/home/my-trips']);
  }
}
