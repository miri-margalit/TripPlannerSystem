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

<<<<<<< HEAD
    const currentUserId = this.authService.currentUser()?.id;

    const newBooking = {
      tripId: Number(currentTrip.id),
      userId: currentUserId,
=======
    const currentUserId = String(this.authService.currentUser()?.id);

    const newBooking = {
      tripId: String(currentTrip.id),
      userId: String(currentUserId),
>>>>>>> aad6b206963738e1be35ae48282c2170c061cb07
      people: this.people,
    };

    console.log('the order is ready to send', newBooking);

    this.apiService.post('bookings', newBooking).subscribe({
      next: (response: any) => {
        console.log('the order have saved in the server', response);
        this.bookingService.allBookings.update(currentBookings => [...currentBookings, response]);
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
    this.router.navigate(['/home/all-trips', this.trip()?.id]);
  }
}
