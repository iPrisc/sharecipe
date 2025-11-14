import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/models/user';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  user: User | undefined;
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {
    this.restoreUser();
  }

  register(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  login(username: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}?username=${username}&password=${password}`);
  }

  logout() {
    this.user = undefined;
    localStorage.removeItem('user');
  }

  saveUser() {
    if (this.user) {
      localStorage.setItem('user', String(this.user.id));
    }
  }

  restoreUser() {
    const id = localStorage.getItem('user');
    if (!id) return;

    this.http.get<User[]>(`${this.apiUrl}?id=${id}`).subscribe(users => {
      if (users.length > 0) {
        this.user = users[0];
      }
    });
  }

  isLoggedIn(): boolean {
    return !!this.user || !!localStorage.getItem('user');
  }

  checkUsernameExists(username: string) {
    return this.http.get<User[]>(`${this.apiUrl}?username=${username}`);
  }

  getAllUsers() {
    return this.http.get<User[]>(this.apiUrl);
  }

}