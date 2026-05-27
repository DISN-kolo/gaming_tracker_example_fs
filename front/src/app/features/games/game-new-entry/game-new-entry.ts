import { Component, inject, output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

import { GameAddDialog } from '../game-add-dialog/game-add-dialog';

@Component({
  selector: 'app-game-new-entry',
  imports: [MatButton],
  templateUrl: './game-new-entry.html',
  styleUrl: './game-new-entry.css',
})
export class GameNewEntry {
  private dialog = inject(MatDialog);
  gameAdded = output<void>();

  openDialog() {
    const dialogRef = this.dialog.open(GameAddDialog);
    dialogRef.afterClosed().subscribe((created: boolean) => {
      if (created) {
        this.gameAdded.emit();
      }
    });
  }
};
