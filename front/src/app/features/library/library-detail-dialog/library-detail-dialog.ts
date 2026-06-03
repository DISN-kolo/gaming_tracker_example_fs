import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Observable, of, switchMap, forkJoin, map } from 'rxjs';
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
    submittedById: string | null,
    onLibraryChanged: () => void,
    isOwner: boolean
  } = inject(MAT_DIALOG_DATA);
  private refresh$ = new BehaviorSubject<void>(undefined);
  gameData = toSignal(
    this.refresh$.pipe(
      switchMap(() => {
        let uploaderObs: Observable<{ username: string } | null>;
        if (this.dialogData.submittedById === null) {
          uploaderObs = of(null);
        } else {
          uploaderObs = this.userService.getUsername(this.dialogData.submittedById);
        }
        return forkJoin({
          entry: this.gameService.getByIdFromLibrary(this.dialogData.id),
          averageRating: this.gameService.getAverageRating(this.dialogData.id).pipe(
            map(r => r.averageRating)
          ),
          uploader: uploaderObs
        });
      })
    )
  );
  public isOwner = this.dialogData.isOwner;


  onLibraryChanged() {
    this.refresh$.next();
    this.dialogData.onLibraryChanged();
  }

  onCatalogDeletionHappened() {
    this.dialogData.onLibraryChanged();
    this.dialogRef.close();
  }
}
