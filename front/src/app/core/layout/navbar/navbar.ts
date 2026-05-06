import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-navbar',
  templateUrl: './navbar.html',
})
export class Navbar {
  private router = inject(Router);

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
