import { inject, Injectable, signal } from '@angular/core';
import { AuthService } from '../../../services/AuthService';
import { user } from '../../../model/user';
import { App } from '../../../app';
import { APIService } from '../../../services/APIService';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private authService = inject(AuthService);
  private api = inject(APIService);
  allUsers = signal<user[]>([]);
  currentUser = signal<user>({} as user);
  selectedUser = signal<user>({} as user);
  error = signal<string>('');

  getAllUsers() {
    this.api.get<user[]>('users').subscribe({
      next: (data) => this.allUsers.set(data),
      error: (err) => this.error.set('Failed to load users'),
    });
  }

  checkUserAdmin(): boolean {
    const user = this.authService.currentUser();
    return user?.isAdmin === true;
  }

  getUserById(userId: string) {
    this.api.get<user>(`users/${userId}`).subscribe({
      next: (data) => this.selectedUser.set(data),
    });
  }
}
