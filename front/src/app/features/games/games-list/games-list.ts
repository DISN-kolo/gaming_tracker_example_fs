import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, switchMap } from 'rxjs';

import { UserService } from '../../../core/user/user.service';
import { GameService } from '../../../core/game/game.service';

import { GameEntry } from '../game-entry/game-entry';
import { GameNewEntry } from '../game-new-entry/game-new-entry';

@Component({
  imports: [GameEntry, GameNewEntry],
  selector: 'app-games-list',
  templateUrl: './games-list.html',
  styleUrl: './games-list.css',
})
export class GamesList {
  router = inject(Router);

  userService = inject(UserService);
  userinfo = toSignal(this.userService.me());

  gameService = inject(GameService);
  private refresh$ = new BehaviorSubject<void>(undefined);
  games = toSignal(
    this.refresh$.pipe(
      switchMap(() => this.gameService.getGames())
    )
  );

  refreshGames() {
    this.refresh$.next();
  }

  isGamesEmpty() {
    const g = this.games();
    return g === undefined || Object.keys(g).length === 0;
  }
}
