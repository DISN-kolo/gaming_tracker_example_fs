import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-library-list',
  templateUrl: './library-list.html',
})
export class LibraryList {
  router = inject(Router);

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
