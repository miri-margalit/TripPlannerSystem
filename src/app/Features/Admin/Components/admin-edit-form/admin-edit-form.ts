import { Component, input, output, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { trip } from '../../../../model/trip';
import { TripService } from '../../Services/TripService';
import { inject } from '@angular/core';

@Component({
  selector: 'app-admin-edit-form',
  imports: [FormsModule],
  templateUrl: './admin-edit-form.html',
  styleUrl: './admin-edit-form.css',
})
export class AdminEditForm implements OnInit {
  private tripService = inject(TripService);
  trip = input<trip>({} as trip);
  closeForm = output<void>();

  formData = signal<trip>({} as trip);

  ngOnInit() {
    this.formData.set({ ...this.trip() });
  }

  onSave() {
    this.tripService.updateTripById(this.formData().id, this.formData());
    this.closeForm.emit();
  }

  onCancel() {
    this.closeForm.emit();
  }
}
