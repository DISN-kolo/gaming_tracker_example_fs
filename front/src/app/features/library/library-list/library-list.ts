import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { UserService } from '../../../core/user/user.service';
import { GameService } from '../../../core/game/game.service';

import { LibraryEntry } from '../library-entry/library-entry';
import { LibraryNewEntry } from '../library-new-entry/library-new-entry';

@Component({
  imports: [ LibraryEntry, LibraryNewEntry ],
  selector: 'app-library-list',
  templateUrl: './library-list.html',
})
export class LibraryList {
  router = inject(Router);

  userService = inject(UserService);
  userinfo = toSignal(this.userService.me());

  gameService = inject(GameService);
  games = toSignal(this.gameService.getLibrary());

  isGamesEmpty() {
    const g = this.games();
    return g === undefined || Object.keys(g).length === 0;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
