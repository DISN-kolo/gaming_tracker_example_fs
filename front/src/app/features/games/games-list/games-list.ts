import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { UserService } from '../../../core/user/user.service';
import { GameService } from '../../../core/game/game.service';

import { GameEntry } from '../game-entry/game-entry';
import { GameNewEntry } from '../game-new-entry/game-new-entry';

@Component({
  imports: [ GameEntry, GameNewEntry ],
  selector: 'app-games-list',
  templateUrl: './games-list.html',
})
export class GamesList {
  router = inject(Router);

  userService = inject(UserService);
  userinfo = toSignal(this.userService.me());

  gameService = inject(GameService);
  games = toSignal(this.gameService.getGames());

  isGamesEmpty() {
    const g = this.games();
    return g === undefined || Object.keys(g).length === 0;
  }
}
