import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, MatCard, MatCardTitle, MatFormField, MatLabel, MatInput, MatButton],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  form = inject(FormBuilder)
  .group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  authService = inject(AuthService);

  router = inject(Router);

  submitError = signal<string | null>(null);

  constructor() {
    this.form.valueChanges.subscribe(() => {
      if (this.submitError() !== null) {
        this.submitError.set(null);
      }
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return ;
    }
    const { email, password } = this.form.value;
    this.authService.login(email!, password!).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token!);
        this.router.navigate(['/']);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.submitError.set('Email or password is incorrect.');
        } else if (err.status === 0) {
          this.submitError.set('Cannot reach the server. Check your connection and try again.');
        } else {
          this.submitError.set('Something went wrong. Please try again.');
        }
      },
    })
  }
};
