import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

import { GameService } from '../../../core/game/game.service';
import { preventNonInteger } from '../../../shared/utils/prevent-non-integer';

@Component({
  selector: 'app-new-library-list-entry-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton,
  ],
  templateUrl: './new-library-list-entry-dialog.html',
  styleUrl: './new-library-list-entry-dialog.css',
})
export class NewLibraryListEntryDialog {
  private router = inject(Router);
  gotoCatalog() {
    this.router.navigate(['catalog']);
  }
  spawnLibraryAndCatalogAddDialog() {
    console.log("this must spawn a thing");
  }
  /*
  private dialogRef = inject(MatDialogRef<NewLibraryListEntryDialog>);
  private gameService = inject(GameService);

  protected readonly preventNonInteger = preventNonInteger;

  form = inject(FormBuilder).group({
    title: ['', [Validators.required, Validators.maxLength(200)]],
    releaseYear: [null as number | null],
    description: [null as string | null, Validators.maxLength(512)],
  });

  submit() {
    if (this.form.invalid) {
      console.error("Invalid form in NewLibraryListEntryDialog");
      return ;
    }
    const { title, releaseYear, description } = this.form.value;
    this.gameService.createGame(title!, releaseYear ?? null, description ?? null).subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => console.error(err),
    });
  }
 */
}
