import { Component, computed, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, catchError, forkJoin, of, switchMap } from 'rxjs';
import {
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

import { GameService } from '../../../core/game/game.service';
import { GameKebabMenu } from '../game-kebab-menu/game-kebab-menu';
import { CompletionStatus } from '../../../shared/models/completion-status';

@Component({
  selector: 'app-game-detail-dialog',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButton, GameKebabMenu],
  templateUrl: './game-detail-dialog.html',
  styleUrl: './game-detail-dialog.css',
})
export class GameDetailDialog {
  private gameService = inject(GameService);
  private dialogData: { isOwner: boolean, gameId: string, onLibraryChanged: () => void } = inject(MAT_DIALOG_DATA);
  public isOwner = this.dialogData.isOwner;

  private refresh$ = new BehaviorSubject<void>(undefined);

  detail = toSignal(
    this.refresh$.pipe(
      switchMap(() => forkJoin({
        game: this.gameService.getById(this.dialogData.gameId),
        avgRating: this.gameService.getAverageRating(this.dialogData.gameId),
        libEntry: this.gameService.getByIdFromLibrary(this.dialogData.gameId).pipe(
          catchError(() => of(null))
        ),
      }))
    )
  );

  inLibrary = computed(() => {
    const d = this.detail();
    return d !== undefined && d.libEntry !== null;
  });

  libEntry = computed(() => {
    const d = this.detail();
    if (!d || !d.libEntry) {
      return undefined;
    }
    return { status: d.libEntry.status as CompletionStatus, rating: d.libEntry.rating };
  });

  onLibraryChanged() {
    this.refresh$.next();
    this.dialogData.onLibraryChanged();
  }
}
