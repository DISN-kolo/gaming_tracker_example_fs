import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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

  submit() {
    if (this.form.invalid) {
      console.error("form invalid");
      return ;
    }
    console.log("form valid");
    console.log(this.form.value);
    const { email, password, username } = this.form.value;
    this.authService.register(email!, password!, username!).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token!);
        this.router.navigate(['/']);
      },
      error: (err) => console.error(err),
    })
  }
};
