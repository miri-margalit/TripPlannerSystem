import { Component, computed, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/AuthService';
import { bookingService } from '../../services/bookingService';

@Component({
  selector: 'app-my-trips',
  imports: [],
  templateUrl: './my-trips.html',
  styleUrl: './my-trips.css',
})
export class MyTrips implements OnInit{

  private authService = inject(AuthService);
  private bookingService = inject(bookingService);

  logesUser = this.authService.currentUser;


  ngOnInit(): void {
   
    if(this.logesUser()?.id){
      this.bookingService.getAllBookingByUserId(this.logesUser()!.id);
    }
     
  }

}
