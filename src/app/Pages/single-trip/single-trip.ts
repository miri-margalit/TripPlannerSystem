import { Component, computed, inject } from '@angular/core';
import { TripsService } from '../../services/TripsService';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../../services/APIService';
import { AuthService } from '../../services/AuthService';


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



  tripId = computed(() => Number(this.route.snapshot.paramMap.get('id')));//מספר הטיול
   trip = computed(() => {//ניגש לסרביס ומחפש לפי המספר את הטיול
    const idAsNumber = this.tripId();
    let found = this.tripService.getTripById(idAsNumber);//במקרה שהוגדר כמספר ימצא את הטיול המבוקש
    if (!found) {// במקרה הנוכחי מוגדר בדאטה כסטרינג
      found = this.tripService.getTripById(String(idAsNumber) as any);
    }
    return found;
  });
  bookTrip() {
  const currentTrip = this.trip();
  if (!currentTrip) {
    return;
  }
  const currentUserId = this.authService.currentUser()?.id;

  const newBooking = {
    tripId: currentTrip.id,
    userId: currentUserId,
    people: 1
  };
    console.log('ההזמנה מוכנה לשליחה:', newBooking);
    this.apiService.post('bookings', newBooking).subscribe({
  next: (response) => {
    console.log('הטיול נשמר בהצלחה בשרת!', response);
    this.router.navigate(['/home/my-trips']);
  },
  error: (err) => {
    console.error('שגיאה בזמן השמירה בשרת:', err);
  }
});


}

}
