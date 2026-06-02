import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, of, switchMap } from 'rxjs';
import {
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

import { UserService } from '../../../core/user/user.service';
import { GameService } from '../../../core/game/game.service';
import { GameKebabMenu } from '../../../shared/components/game-kebab-menu/game-kebab-menu';
import { CompletionStatus } from '../../../shared/models/completion-status';

@Component({
  selector: 'app-library-detail-dialog',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButton, GameKebabMenu],
  templateUrl: './library-detail-dialog.html',
  styleUrl: './library-detail-dialog.css',
})
export class LibraryDetailDialog {
  private dialogRef = inject(MatDialogRef<LibraryDetailDialog>);
  private gameService = inject(GameService);
  private userService = inject(UserService);
  public dialogData: {
    id: string,
    title: string,
    releaseYear: number | null,
    description: string | null,
    submittedById: string | null,
    status: CompletionStatus,
    rating: number | null,
    onLibraryChanged: () => void,
    isOwner: boolean
  } = inject(MAT_DIALOG_DATA);
  public isOwner = this.dialogData.isOwner;

  private refresh$ = new BehaviorSubject<void>(undefined);

  averageRating = toSignal(
    this.refresh$.pipe(
      switchMap(() => this.gameService.getAverageRating(this.dialogData.id))
    )
  );

  uploader = toSignal(
    this.refresh$.pipe(
      switchMap(() => {
        if (this.dialogData.submittedById === null) {
          return of(null);
        }
        return this.userService.getUsername(this.dialogData.submittedById);
      })
    )
  );

  onLibraryChanged() {
    this.refresh$.next();
    this.dialogData.onLibraryChanged();
  }

  onCatalogDeletionHappened() {
    this.dialogData.onLibraryChanged();
    this.dialogRef.close();
  }
}
