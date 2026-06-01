import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

import { GameService } from '../../../core/game/game.service';

@Component({
  selector: 'app-game-delete-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton,
  ],
  templateUrl: './game-delete-dialog.html',
  styleUrl: './game-delete-dialog.css',
})
export class GameDeleteDialog {
  private dialogRef = inject(MatDialogRef<GameDeleteDialog>);
  data = inject<{ gameId: string, message: string }>(MAT_DIALOG_DATA);
  private gameService = inject(GameService);

  confirmDelete() {
    this.gameService.removeFromCatalog(this.data.gameId).subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => console.error(err),
    });
  }
}
