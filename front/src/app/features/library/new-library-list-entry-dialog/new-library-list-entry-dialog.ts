import { Component, inject, output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

import { GameService } from '../../../core/game/game.service';
import { preventNonInteger } from '../../../shared/utils/prevent-non-integer';
import { NewGamesListEntryDialog } from '../../../shared/components/new-games-list-entry-dialog/new-games-list-entry-dialog';
import { LibraryAddDialog } from '../../../shared/components/library-add-dialog/library-add-dialog';

import { LibraryAddDialogQuitWarning } from '../library-add-dialog-quit-warning/library-add-dialog-quit-warning';

import { filter } from 'rxjs/operators';

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
  private dialogRef = inject(MatDialogRef<NewLibraryListEntryDialog>);
  private dialog = inject(MatDialog);
  private router = inject(Router);
  gotoCatalog() {
    this.router.navigate(['catalog']);
    this.dialogRef.close();
  }
  spawnLibraryAndCatalogAddDialog() {
    const dialogRef = this.dialog.open(NewGamesListEntryDialog);
    dialogRef.afterClosed().subscribe((gameid: string) => {
      if (gameid) {
        this.openLibraryAddDialog(gameid);
      }
    });
  }

  openLibraryAddDialog(gameid: string) {
    const dialogRef = this.dialog.open(LibraryAddDialog, {
      data: {
        gameId: gameid,
        needsCloseWarning: true,
      },
      disableClose: true,
    });
    dialogRef.backdropClick().subscribe(() => this.spawnQuitWarning());
    dialogRef.keydownEvents().pipe(
      filter(e => e.key === 'Escape')
    ).subscribe(() => this.spawnQuitWarning());
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("result: ", result);
        this.dialogRef.close(true);
      }
    });
  }

  spawnQuitWarning() {
    const dialogRef = this.dialog.open(LibraryAddDialogQuitWarning);
    dialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        if (result === "delete") {
          console.log("delete the game");
        } else if (result === "keep") {
          console.log("stop the library addition but keep the game in the catalog");
        } else {
          console.log("will this logic branch hit?");
        }
      } else {
        console.log("go on with the process of adding the game to the library");
      }
    })
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
