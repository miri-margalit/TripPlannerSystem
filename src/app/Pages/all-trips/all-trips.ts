import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { TripsService } from '../../services/TripsService';
import { TripCard } from '../../components/trip-card/trip-card';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-trips',
  standalone: true,
  imports: [TripCard, FormsModule],
  templateUrl: './all-trips.html',
  styleUrl: './all-trips.css',
})
export class AllTrips implements OnInit {
  private tripService = inject(TripsService);

  trips = this.tripService.allTrips;
  loading = this.tripService.loading;
  error = this.tripService.error;


  searchTerm = signal<string>('');
  sortBy = signal<string>('none');

  filteredAndSortedTrips = computed(() => {
    let result = this.trips();

    const search = this.searchTerm().toLowerCase().trim();
    if (search) {
      result = result.filter(t => 
        t.name?.toLowerCase().includes(search) || 
        t.destination?.toLowerCase().includes(search)
      );
    }

    const sortType = this.sortBy();
    if (sortType === 'lowToHigh') {
      result = [...result].sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortType === 'highToLow') {
      result = [...result].sort((a, b) => (b.price || 0) - (a.price || 0));
    }

    return result;
  });

  ngOnInit(): void {
    this.tripService.getTrips();
  }
}
