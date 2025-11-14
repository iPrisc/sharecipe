import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../../shared/models/recipe';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-recipe-list',
  standalone: false,
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss'
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  users: User[] = [];

  constructor(
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  ngOnInit() {

    this.recipeService.getAll().subscribe(data => {
      this.recipes = data;
    });

    this.authService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  getUserName(id: string) {
    return this.users.find(u => u.id === id)?.username || "Inconnu";
  }

}
