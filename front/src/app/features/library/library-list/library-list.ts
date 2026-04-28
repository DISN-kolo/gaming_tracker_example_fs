import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';

import { AuthService } from '../../../core/auth/auth.service';

@Component({
  imports: [ AsyncPipe ],
  selector: 'app-library-list',
  templateUrl: './library-list.html',
})
export class LibraryList {
  router = inject(Router);

  authService = inject(AuthService);
  userinfo$ = this.authService.me();

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
