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
  selector: 'app-library-delete-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton,
  ],
  templateUrl: './library-delete-dialog.html',
  styleUrl: './library-delete-dialog.css',
})
export class LibraryDeleteDialog {
  private dialogRef = inject(MatDialogRef<LibraryDeleteDialog>);
  data = inject<{ gameId: string, message: string }>(MAT_DIALOG_DATA);
  private gameService = inject(GameService);

  confirmDelete() {
    this.gameService.removeFromLibrary(this.data.gameId).subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => console.error(err),
    });
  }
}
