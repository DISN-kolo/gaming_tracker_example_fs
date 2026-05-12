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

export const COMPLETION_STATUSES: { value: string; label: string }[] = [
  { value: 'PlanToPlay', label: 'Plan to Play' },
  { value: 'BoughtButNotPlayed', label: 'Bought But Not Played' },
  { value: 'Playing', label: 'Playing' },
  { value: 'Abandoned', label: 'Abandoned' },
  { value: 'Completed', label: 'Completed' },
];

function statusInList(statuses: { value: string }[]): ValidatorFn {
  return (control: AbstractControl) => {
    const isValid = statuses.some(s => s.value === control.value);
    if (isValid) {
      return null;
    }
    console.error("Validation failed: status wasn't in list");
    return { invalidStatus: true };
  };
}

@Component({
  selector: 'app-game-library-add-dialog',
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
  templateUrl: './game-library-add-dialog.html',
})
export class GameLibraryAddDialog {
  private dialogRef = inject(MatDialogRef<GameLibraryAddDialog>);
  private gameService = inject(GameService);
  private gameId: string = inject(MAT_DIALOG_DATA);

  statuses = COMPLETION_STATUSES;

  form = inject(FormBuilder).group({
    status: ['', [Validators.required, statusInList(COMPLETION_STATUSES)]],
    rating: [null as number | null, [Validators.min(1), Validators.max(10)]],
  });

  submit() {
    if (this.form.invalid) {
      console.error(this.form.errors);
      return ;
    }
    const { status, rating } = this.form.value;
    this.gameService.addToLibrary(this.gameId, status!, rating ?? null).subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => console.error(err),
    });
  }
}
