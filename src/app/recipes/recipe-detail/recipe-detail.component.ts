import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { AuthService } from '../../auth/auth.service';
import { FavoriteService } from '../../favorites/favorite.service';
import { User } from '../../shared/models/user';
import { Favorite } from '../../shared/models/favorite';

@Component({
  selector: 'app-recipe-detail',
  standalone: false,
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss'
})
export class RecipeDetailComponent implements OnInit {

  recipe: any;
  users: User[] = [];
  favorites: Favorite[] = [];
  userId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    public authService: AuthService,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit() {

    this.userId = localStorage.getItem('user');

    this.authService.getAllUsers().subscribe(users => {
      this.users = users;
    });

    const id = this.route.snapshot.paramMap.get('id')!;
    this.recipeService.getById(id).subscribe(recipe => {
      this.recipe = recipe;
    });

    if (this.userId) {
      this.favoriteService.getFavoritesByUser(this.userId)
        .subscribe(favs => this.favorites = favs);
    }
  }

  getUserName(id: string) {
    return this.users.find(u => u.id === id)?.username || 'Inconnu';
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
      });
      return;
    }

    this.favoriteService.addFavorite(this.userId, recipeId).subscribe(fav => {
      this.favorites.push(fav);
    });
  }
}
