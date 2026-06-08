import { Component, inject } from '@angular/core';
import { switchMap } from 'rxjs';
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
import { COMPLETION_STATUSES, CompletionStatus, statusInList } from '../../../shared/models/completion-status';
import { preventNonInteger } from '../../../shared/utils/prevent-non-integer';

@Component({
  selector: 'app-new-joint-library-catalog-entry-dialog',
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
  templateUrl: './new-joint-library-catalog-entry-dialog.html',
  styleUrl: './new-joint-library-catalog-entry-dialog.css',
})
export class NewJointLibraryCatalogEntry {
  private dialogRef = inject(MatDialogRef<NewJointLibraryCatalogEntry>);
  private gameService = inject(GameService);

  protected readonly preventNonInteger = preventNonInteger;

  form = inject(FormBuilder).group({
    title: ['', [Validators.required, Validators.maxLength(200)]],
    releaseYear: [null as number | null],
    description: [null as string | null, Validators.maxLength(512)],
    status: [null as CompletionStatus | null, [Validators.required, statusInList(COMPLETION_STATUSES)]],
    rating: [null as number | null, [Validators.min(1), Validators.max(10)]],
  });

  submit() {
    if (this.form.invalid) {
      console.error("Invalid form in NewJointLibraryCatalogEntry");
      return ;
    }
    const {
      title,
      releaseYear,
      description,
      status,
      rating
    } = this.form.value;
    this.gameService.createGame(title!, releaseYear ?? null, description ?? null).pipe(
      switchMap((gameId) => this.gameService.addToLibrary(gameId, status!, rating ?? null))
    ).subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => console.error(err),
    });
  }
}
