import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { TripService } from '../../Services/TripService';
import { AdminTripCard } from '../../Components/admin-trip-card/admin-trip-card';
import { BookingService } from '../../Services/BookingServices';
import { AdminEditForm } from '../../Components/admin-edit-form/admin-edit-form';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-trips',
  imports: [AdminTripCard, AdminEditForm, FormsModule],
  templateUrl: './admin-trips.html',
  styleUrl: './admin-trips.css',
})
export class AdminTrips implements OnInit {
  private tripService = inject(TripService);
  private bookingService = inject(BookingService);

  allTrips = this.tripService.allTrips;
  selectedTrip = this.tripService.selectedTrip;
  isAddOpen = signal(false);
  searchTerm = signal('');

  filteredTrips = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.allTrips();
    return this.allTrips().filter((t) => t.name.toLowerCase().includes(term));
  });

  ngOnInit(): void {
    this.tripService.getAllTrips();
    this.bookingService.getAllBooking();
  }
}
