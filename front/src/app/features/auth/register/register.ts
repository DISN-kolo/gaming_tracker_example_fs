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
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, MatCard, MatCardTitle, MatFormField, MatLabel, MatInput, MatButton],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  form = inject(FormBuilder)
  .group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    username: ['', Validators.required],
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
      return ;
    }
    const { email, password, username } = this.form.value;
    this.authService.register(email!, password!, username!).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token!);
        this.router.navigate(['/']);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 400) {
          this.submitError.set('Invalid registration parameters.');
        } else if (err.status === 0) {
          this.submitError.set('Cannot reach the server. Check your connection and try again.');
        } else {
          this.submitError.set('Something went wrong. Please try again.');
        }
      },
    })
  }
};
