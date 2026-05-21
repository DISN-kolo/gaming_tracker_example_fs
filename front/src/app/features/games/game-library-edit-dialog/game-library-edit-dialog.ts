import { Component, inject, computed } from '@angular/core';
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

import { COMPLETION_STATUSES, CompletionStatus, statusInList } from '../../../shared/models/completion-status';
import { preventNonInteger } from '../../../shared/utils/prevent-non-integer';

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
  styleUrl: './game-library-edit-dialog.css',
})
export class GameLibraryEditDialog {
  private dialogRef = inject(MatDialogRef<GameLibraryEditDialog>);
  private gameService = inject(GameService);
  private gameData: {
    gameId: string,
    status: CompletionStatus,
    rating: number | null
  } = inject(MAT_DIALOG_DATA);

  statuses = COMPLETION_STATUSES;
  protected readonly preventNonInteger = preventNonInteger;

  form = inject(FormBuilder).group({
    status: [this.gameData.status, [statusInList(COMPLETION_STATUSES)]],
    rating: [this.gameData.rating, [Validators.min(1), Validators.max(10)]],
  });

  submit() {
    if (this.form.invalid) {
      console.error(this.form.errors);
      return ;
    }
    const { status, rating } = this.form.value;
    this.gameService.editInLibrary(this.gameData.gameId, status!, rating ?? null).subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => console.error(err),
    });
  }
}
