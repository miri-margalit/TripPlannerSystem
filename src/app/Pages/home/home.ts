import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/AuthService';
import { Router, RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { TripsService } from '../../services/TripsService';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, RouterLinkWithHref],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private authService = inject(AuthService);
  private route = inject(Router);
  
  logedUser = this.authService.currentUser;
  user = this.authService.currentUser;

  logout() {
    this.authService.logout();
    this.route.navigate(['/login']);
  }

  constructor(private tripsService: TripsService) {
    this.tripsService.getTrips();
  }
}
