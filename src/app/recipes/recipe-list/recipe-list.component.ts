import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../../shared/models/recipe';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../shared/models/user';
import { FavoriteService } from '../../favorites/favorite.service';
import { Favorite } from '../../shared/models/favorite';

@Component({
  selector: 'app-recipe-list',
  standalone: false,
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss'
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];

  users: User[] = [];
  favorites: Favorite[] = [];
  userId: string | null = null;

  showFavoritesOnly = false;

  constructor(
    private recipeService: RecipeService,
    public authService: AuthService,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('user');

    this.recipeService.getAll().subscribe(recipes => {
      this.recipes = recipes;
      this.updateFilteredRecipes();
    });

    this.authService.getAllUsers().subscribe(users => {
      this.users = users;
    });

    if (this.userId) {
      this.favoriteService.getFavoritesByUser(this.userId)
        .subscribe(favs => {
          this.favorites = favs;
          this.updateFilteredRecipes();
        });
    }
  }

  getUserName(id: string) {
    return this.users.find(u => u.id === id)?.username || "Inconnu";
  }

  isFavorite(recipeId: string): boolean {
    return this.favorites.some(f => f.recipeId === recipeId);
  }

  toggleFavorite(recipeId: string) {
    if (!this.userId) return;

    const existing = this.favorites.find(f => f.recipeId === recipeId);

    if (existing) {
      this.favoriteService.removeFavorite(existing.id!).subscribe(() => {
        this.favorites = this.favorites.filter(f => f.id !== existing.id);
        this.updateFilteredRecipes();
      });
      return;
    }

    this.favoriteService.addFavorite(this.userId, recipeId).subscribe(fav => {
      this.favorites.push(fav);
      this.updateFilteredRecipes();
    });
  }

  toggleFavoritesView() {
    this.showFavoritesOnly = !this.showFavoritesOnly;
    this.updateFilteredRecipes();
  }

  updateFilteredRecipes() {
    if (this.showFavoritesOnly) {
      const favIds = this.favorites.map(f => f.recipeId);
      this.filteredRecipes = this.recipes.filter(r => favIds.includes(r.id));
    } else {
      this.filteredRecipes = this.recipes;
    }
  }
}