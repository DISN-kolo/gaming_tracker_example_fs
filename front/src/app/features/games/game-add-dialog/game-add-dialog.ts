import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

import { GameService } from '../../../core/game/game.service';

@Component({
  selector: 'app-game-add-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
  ],
  templateUrl: './game-add-dialog.html',
})
export class GameAddDialog {
  private dialogRef = inject(MatDialogRef<GameAddDialog>);
  private gameService = inject(GameService);

  form = inject(FormBuilder).group({
    title: ['', [Validators.required, Validators.maxLength(200)]],
  });

  submit() {
    if (this.form.invalid) return;
    this.gameService.createGame(this.form.value.title!).subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => console.error(err),
    });
  }
}
