import { Component, computed, inject } from '@angular/core';
import { UserService } from '../../Services/UserService';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../../services/AuthService';

@Component({
  selector: 'app-home-admin',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './home-admin.html',
  styleUrl: './home-admin.css',
})
export class HomeAdmin {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  isAdmin = computed(() => this.userService.checkUserAdmin());

  logout() {
    this.authService.logout();
  }
}
