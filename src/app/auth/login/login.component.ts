import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  login() {
    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe((users: User[]) => {
      if (users.length === 0) {
        alert('Identifiants incorrects');
        return;
      }

      this.authService.user = users[0];
      this.authService.saveUser();
      this.router.navigate(['/']);
    });
  }
}
