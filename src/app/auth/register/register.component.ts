import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', Validators.required],
    }, { validators: this.matchPasswords });
  }

  matchPasswords(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { mismatch: true };
  }

  register() {
    if (this.registerForm.invalid) return;

    const username = this.registerForm.value.username;
    const password = this.registerForm.value.password;
    
    this.authService.checkUsernameExists(username).subscribe(users => {
      if (users.length > 0) {
        alert("Ce nom d'utilisateur existe déjà !");
        return;
      }

      this.authService.register({ username, password }).subscribe(() => {
        this.router.navigate(['/login']);
      });
    });
  }
}
