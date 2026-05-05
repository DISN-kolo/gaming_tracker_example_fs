import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

import { UserService } from '../../../core/user/user.service';

@Component({
  imports: [ AsyncPipe ],
  selector: 'app-library-list',
  templateUrl: './library-list.html',
})
export class LibraryList {
  router = inject(Router);

  userService = inject(UserService);
  userinfo = toSignal(this.userService.me());

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
