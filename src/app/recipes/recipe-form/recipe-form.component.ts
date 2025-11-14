import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-recipe-form',
  standalone: false,
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.scss'
})
export class RecipeFormComponent {

  recipeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private router: Router,
    private authService: AuthService
  ) {
    this.recipeForm = this.fb.group({
      title: ['', Validators.required],
      difficulty: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  submit() {
    if (this.recipeForm.invalid) return;

    const recipeData = {
      ...this.recipeForm.value,
      userId: this.authService.user?.id
    };

    this.recipeService.addRecipe(recipeData).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}