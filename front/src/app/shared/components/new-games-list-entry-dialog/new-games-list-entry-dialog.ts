import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

import { GameService } from '../../../core/game/game.service';
import { preventNonInteger } from '../../../shared/utils/prevent-non-integer';

@Component({
  selector: 'app-new-games-list-entry-dialog',
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
    MatHint
  ],
  templateUrl: './new-games-list-entry-dialog.html',
  styleUrl: './new-games-list-entry-dialog.css',
})
export class NewGamesListEntryDialog {
  private dialogRef = inject(MatDialogRef<NewGamesListEntryDialog>);
  private gameService = inject(GameService);

  protected readonly preventNonInteger = preventNonInteger;

  form = inject(FormBuilder).group({
    title: ['', [Validators.required, Validators.maxLength(200)]],
    releaseYear: [null as number | null],
    description: [null as string | null, Validators.maxLength(512)],
  });

  submit() {
    if (this.form.invalid) {
      console.error("Invalid form in NewGamesListEntryDialog");
      return ;
    }
    const { title, releaseYear, description } = this.form.value;
    this.gameService.createGame(title!, releaseYear ?? null, description ?? null).subscribe({
      next: (r) => this.dialogRef.close(r.id),
      error: (err) => console.error(err),
    });
  }
}
