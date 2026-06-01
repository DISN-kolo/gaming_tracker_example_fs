import { Component, inject, input, output } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuTrigger, MatMenuItem } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';

import { LibraryAddDialog } from '../library-add-dialog/library-add-dialog';
import { LibraryEditDialog } from '../library-edit-dialog/library-edit-dialog';
import { LibraryDeleteDialog } from '../library-delete-dialog/library-delete-dialog';
/*
import { GameEditDialog } from '../game-catalog-edit-dialog/game-catalog-edit-dialog';
*/
import { GameDeleteDialog } from '../game-delete-dialog/game-delete-dialog';
import { CompletionStatus } from '../../models/completion-status';

@Component({
  selector: 'app-game-kebab-menu',
  imports: [MatIconButton, MatIcon, MatMenu, MatMenuTrigger, MatMenuItem],
  templateUrl: './game-kebab-menu.html',
  styleUrl: './game-kebab-menu.css',
})
export class GameKebabMenu {
  private dialog = inject(MatDialog);

  gameId = input.required<string>();
  inLibrary = input.required<boolean>();
  isOwner = input.required<boolean>();
  libEntry = input<{ status: CompletionStatus, rating: number | null }>();
  libraryChanged = output<void>();
  catalogDeletionHappened = output<void>();

  openLibraryAddDialog() {
    const dialogRef = this.dialog.open(LibraryAddDialog, {
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
    const dialogRef = this.dialog.open(LibraryEditDialog, {
      data: { gameId: this.gameId(), status: entry.status, rating: entry.rating },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.libraryChanged.emit();
      }
    });
  }

  openLibraryDeleteDialog() {
    const dialogRef = this.dialog.open(LibraryDeleteDialog, {
      data: {
        gameId: this.gameId(),
        message: "Are you sure you want to delete this game from your library? It will still be available to add later."
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.libraryChanged.emit();
      }
    });
  }

  /*
  openEditDialog() {
    const dialogRef = this.dialog.open(GameEditDialog, {
      data: this.gameId(),
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.libraryChanged.emit();
      }
    });
  }
  */

  openGameDeleteDialog() {
    const dialogRef = this.dialog.open(GameDeleteDialog, {
      data: {
        gameId: this.gameId(),
        message: "Are you sure you want to entirely delete this game from the website? THIS ACTION CANNOT BE UNDONE."
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.catalogDeletionHappened.emit();
      }
    });
  }
}
