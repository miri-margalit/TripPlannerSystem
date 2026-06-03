import { inject, Injectable, signal } from '@angular/core';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { user } from '../model/user';
import { Router } from '@angular/router';
import { usersService } from './UsersService';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersService = inject(usersService);
  private router = inject(Router);

  currentUser = signal<user | null>(JSON.parse(localStorage.getItem('user') || 'null'));
  error = signal<string>('');

  constructor() {
    const user = localStorage.getItem('user');

    if (user) {
      this.currentUser.set(JSON.parse(user));
    }
  }

  login(dataUser: { email: string; password: string }): Observable<void> {
    return this.usersService.getUsers().pipe(
      tap((users) => {
        const user = users.find((u) => u.email === dataUser.email);

        // לא קיים משתמש
        if (!user) {
          this.error.set('user is not found');
          return;
        }

        // סיסמה שגויה
        if (user.password !== dataUser.password) {
          this.error.set('password is incorrect');
          return;
        }

        //שמירת המשתמש
        this.currentUser.set(user);

        //שמירת המשתמש ב localStorage
        localStorage.setItem('user', JSON.stringify(user));

        // הצלחה
        this.error.set('');

        if (user.isAdmin === true) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/home']);
        }
      }),

      map(() => void 0),
    );
  }

  register(dataUser: { name: string; email: string; password: string }): void {
    //איפוס ה error
    this.error.set('');

    this.usersService.getUsers().subscribe((users) => {
      const existingUser = users.find((u) => u.email === dataUser.email);

      //משתמש קיים
      if (existingUser) {
        this.error.set('user already exists');
        return;
      }

      const newUser: user = {
        id: String(Date.now()),
        name: dataUser.name,
        email: dataUser.email,
        password: dataUser.password,
        isAdmin: false,
      };

      //הוספת של המשתמש
      this.usersService.addUser(newUser).subscribe(() => {
        //שמירת המשתמש
        this.currentUser.set(newUser);
        //שמירת המשתמש בlocal storage
        localStorage.setItem('user', JSON.stringify(newUser));
        this.error.set('');
        this.router.navigate(['/home']);
      });
    });
  }

  logout(): void {
    this.currentUser.set(null);
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}
