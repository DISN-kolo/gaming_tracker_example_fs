import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, map, switchMap } from 'rxjs';

import { UserService } from '../../../core/user/user.service';
import { GameService } from '../../../core/game/game.service';
import { CompletionStatus } from '../../../shared/models/completion-status';

import { LibraryListEntry } from '../library-list-entry/library-list-entry';
import { NewLibraryListEntry } from '../new-library-list-entry/new-library-list-entry';

@Component({
  imports: [LibraryListEntry, NewLibraryListEntry],
  selector: 'app-library-list',
  templateUrl: './library-list.html',
  styleUrl: './library-list.css',
})
export class LibraryList {
  router = inject(Router);

  userService = inject(UserService);
  userinfo = toSignal(this.userService.me());

  gameService = inject(GameService);
  private refresh$ = new BehaviorSubject<void>(undefined);

  libraryEntries = toSignal(
    this.refresh$.pipe(
      switchMap(() => this.gameService.getLibrary()),
      map(entries => new Map(entries.map(e => [e.id, { status: e.status as CompletionStatus, rating: e.rating }])))
    )
  );

  refreshLibrary() {
    this.refresh$.next();
  }

  isLibraryEmpty() {
    const l = this.libraryEntries();
    return l === undefined || Object.keys(l).length === 0;
  }
}
