import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  private baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  get<T>(endPoint: string) {
    return this.http.get<T>(`${this.baseUrl}/${endPoint}`);
  }

  post<T>(endPoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endPoint}`, body);
  }

  put<T>(endPoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endPoint}`, body);
  }

  delete<T>(endPoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endPoint}`);
  }
}
