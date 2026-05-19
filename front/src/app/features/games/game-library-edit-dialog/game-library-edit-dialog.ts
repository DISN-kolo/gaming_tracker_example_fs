import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

import { GameService } from '../../../core/game/game.service';

import { COMPLETION_STATUSES, CompletionStatusOption, statusInList } from "../game-library-add-dialog/game-library-add-dialog";

@Component({
  selector: 'app-game-library-edit-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatInput,
    MatButton,
  ],
  templateUrl: './game-library-edit-dialog.html',
})
export class GameLibraryEditDialog {
  private dialogRef = inject(MatDialogRef<GameLibraryEditDialog>);
  private gameService = inject(GameService);
  private gameData: {
    gameId: string,
    status: CompletionStatusOption,
    rating: number | null
  } = inject(MAT_DIALOG_DATA);

  statuses = COMPLETION_STATUSES;

  form = inject(FormBuilder).group({
    status: [this.gameData.status, [statusInList]],
    rating: [this.gameData.rating, [Validators.min(1), Validators.max(10)]],
  });

  submit() {
    if (this.form.invalid) {
      console.error(this.form.errors);
      return ;
    }
    const { status, rating } = this.form.value;
    this.gameService.editInLibrary(this.gameId, status!, rating ?? null).subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => console.error(err),
    });
  }
}
