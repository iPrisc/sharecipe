import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../shared/models/recipe';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private apiUrl = 'http://localhost:3000/recipes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.apiUrl);
  }

  getById(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.apiUrl}/${id}`);
  }

  addRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.apiUrl, recipe);
  }

}