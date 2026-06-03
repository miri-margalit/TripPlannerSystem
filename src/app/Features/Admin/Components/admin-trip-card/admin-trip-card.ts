import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { trip } from '../../../../model/trip';
import { TripService } from '../../Services/TripService';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AdminEditForm } from '../admin-edit-form/admin-edit-form';
import { BookingService } from '../../Services/BookingServices';

@Component({
  selector: 'app-admin-trip-card',
  imports: [AdminEditForm],
  templateUrl: './admin-trip-card.html',
  styleUrl: './admin-trip-card.css',
})
export class AdminTripCard implements OnInit {
  private tripService = inject(TripService);
  private bookingService = inject(BookingService);
  trip = input<trip>({} as trip);
  isEditOpen = signal(false);
  isDeleteOpen = signal(false);
  deleteError = signal('');

  ngOnInit(): void {
    this.tripService.getTripById(this.trip().id);
  }

  participants = computed(() => this.bookingService.getTotalParticipantsByTripId(this.trip().id));

  onEdit() {
    this.tripService.selectedTrip.set(this.trip());
    this.isEditOpen.set(true);
  }

  onCloseEdit() {
    this.isEditOpen.set(false);
  }
  onDeleteClick() {
    if (this.participants() > 0) {
      this.deleteError.set(
        `Cannot delete — ${this.participants()} participants are registered to this trip.`,
      );
      return;
    }
    this.deleteError.set('');
    this.isDeleteOpen.set(true);
  }

  onConfirmDelete() {
    this.tripService.deleteTrip(this.trip().id);
    this.isDeleteOpen.set(false);
  }

  onCancelDelete() {
    this.isDeleteOpen.set(false);
  }
}
