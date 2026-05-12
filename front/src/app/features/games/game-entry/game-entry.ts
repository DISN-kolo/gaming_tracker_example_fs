import { Component, inject, input, output } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuTrigger, MatMenuItem } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';

import { GameLibraryAddDialog } from '../game-library-add-dialog/game-library-add-dialog';
import { GameDetailDialog } from '../game-detail-dialog/game-detail-dialog';

@Component({
  selector: 'app-game-entry',
  imports: [MatIconButton, MatIcon, MatMenu, MatMenuTrigger, MatMenuItem],
  templateUrl: './game-entry.html',
  styleUrl: './game-entry.css',
})
export class GameEntry {
  private dialog = inject(MatDialog);

  game = input.required<{
    id: string,
    title: string,
    releaseYear: number | null,
    description: string | null,
    submittedById: string | null,
  }>();
  inLibrary = input.required<boolean>();
  libraryChanged = output<void>();

  openDetailDialog() {
    this.dialog.open(GameDetailDialog, {
      width: '480px',
      data: this.game().id,
    });
  }

  openLibraryDialog() {
    const dialogRef = this.dialog.open(GameLibraryAddDialog, {
      width: '420px',
      data: this.game().id,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.libraryChanged.emit();
      }
    });
  }
}
