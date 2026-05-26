import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from '../model/user';
import { APIService } from './APIService';

@Injectable({
  providedIn: 'root',
})
export class usersService {
  private api = inject(APIService);

  getUsers(): Observable<user[]> {
    return this.api.get<user[]>('users');
  }

  getUserById(userId: Number): Observable<user> {
    return this.api.get<user>(`users/${userId}`);
  }

  addUser(user: user) : Observable<user>{
    return this.api.post<user>('users', user);
  }
}
