import { Component, inject, input, output } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuTrigger, MatMenuItem } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';

import { GameLibraryAddDialog } from '../game-library-add-dialog/game-library-add-dialog';
import { GameLibraryEditDialog } from '../game-library-edit-dialog/game-library-edit-dialog';
/*
import { GameLibraryDeleteDialog } from '../game-library-delete-dialog/game-library-delete-dialog';
import { GameCatalogEditDialog } from '../game-catalog-edit-dialog/game-catalog-edit-dialog';
import { GameCatalogDeleteDialog } from '../game-catalog-delete-dialog/game-catalog-delete-dialog';
*/
import { CompletionStatus } from '../../../shared/models/completion-status';

@Component({
  selector: 'app-game-kebab-menu',
  imports: [MatIconButton, MatIcon, MatMenu, MatMenuTrigger, MatMenuItem],
  templateUrl: './game-kebab-menu.html',
})
export class GameKebabMenu {
  private dialog = inject(MatDialog);

  gameId = input.required<string>();
  inLibrary = input.required<boolean>();
  isOwner = input.required<boolean>();
  libEntry = input<{ status: CompletionStatus, rating: number | null }>();
  libraryChanged = output<void>();

  openLibraryAddDialog() {
    const dialogRef = this.dialog.open(GameLibraryAddDialog, {
      width: '420px',
      data: this.gameId(),
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.libraryChanged.emit();
      }
    });
  }

  openLibraryEditDialog() {
    const entry = this.libEntry();
    if (!entry) {
      return ;
    }
    const dialogRef = this.dialog.open(GameLibraryEditDialog, {
      width: '420px',
      data: { gameId: this.gameId(), status: entry.status, rating: entry.rating },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.libraryChanged.emit();
      }
    });
  }

  /*
  openLibraryDeleteDialog() {
    const dialogRef = this.dialog.open(GameLibraryDeleteDialog, {
      width: '420px',
      data: this.gameId(),
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.libraryChanged.emit();
      }
    });
  }

  openCatalogEditDialog() {
    const dialogRef = this.dialog.open(GameCatalogEditDialog, {
      width: '420px',
      data: this.gameId(),
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.libraryChanged.emit();
      }
    });
  }

  openCatalogDeleteDialog() {
    const dialogRef = this.dialog.open(GameCatalogDeleteDialog, {
      width: '420px',
      data: this.gameId(),
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.libraryChanged.emit();
      }
    });
  }
  */
}
