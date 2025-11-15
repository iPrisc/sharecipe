import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Favorite } from '../shared/models/favorite';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private apiUrl = 'http://localhost:3000/favorites';

  constructor(private http: HttpClient) {}

  addFavorite(userId: string, recipeId: string): Observable<Favorite> {
    const newFav = { userId, recipeId };
    return this.http.post<Favorite>(this.apiUrl, newFav);
  }

  removeFavorite(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getFavoritesByUser(userId: string): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(`${this.apiUrl}?userId=${userId}`);
  }

  getFavorite(userId: string, recipeId: string): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(`${this.apiUrl}?userId=${userId}&recipeId=${recipeId}`);
  }
}
