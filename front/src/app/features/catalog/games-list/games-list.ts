import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, map, switchMap } from 'rxjs';

import { UserService } from '../../../core/user/user.service';
import { GameService } from '../../../core/game/game.service';
import { CompletionStatus } from '../../../shared/models/completion-status';

import { GamesListMember } from '../games-list-entry/games-list-entry';
import { NewGamesListMember } from '../new-games-list-entry/new-games-list-entry';

@Component({
  imports: [GamesListMember, NewGamesListMember],
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
      switchMap(() => this.gameService.getGames()),
      map(games => [...games].reverse())
    )
  );

  libraryEntries = toSignal(
    this.refresh$.pipe(
      switchMap(() => this.gameService.getLibrary()),
      map(entries => new Map(entries.map(e => [e.id, { status: e.status as CompletionStatus, rating: e.rating }])))
    )
  );

  ownedGameIds = computed(() => {
    const userId = this.userinfo()?.id;
    if (!userId) {
      return new Set<string>();
    }
    const games = this.games() ?? [];
    return new Set(
      games
      .filter(g => g.submittedById === userId)
      .map(g => g.id)
    )
  });

  refreshGames() {
    this.refresh$.next();
  }

  isGamesEmpty() {
    const g = this.games();
    return g === undefined || Object.keys(g).length === 0;
  }
}
