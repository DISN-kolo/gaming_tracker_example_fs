import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
})
export class Login {
  form = inject(FormBuilder)
  .group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  authService = inject(AuthService);

  submit() {
    if (this.form.invalid) {
      console.error("form invalid");
      return ;
    }
    console.log("form valid");
    console.log(this.form.value);
    const { email, password } = this.form.value;
    this.authService.login(email!, password!).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.error(err),
    })
  }
};
