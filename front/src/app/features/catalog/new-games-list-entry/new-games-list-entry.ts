import { Component, inject, output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

import { NewGamesListEntryDialog } from '../../../shared/components/new-games-list-entry-dialog/new-games-list-entry-dialog';

@Component({
  selector: 'app-new-games-list-entry',
  imports: [MatButton],
  templateUrl: './new-games-list-entry.html',
  styleUrl: './new-games-list-entry.css',
})
export class NewGamesListEntry {
  private dialog = inject(MatDialog);
  gameAdded = output<void>();

  openDialog() {
    const dialogRef = this.dialog.open(NewGamesListEntryDialog);
    dialogRef.afterClosed().subscribe((gameid: string) => {
      if (gameid) {
        this.gameAdded.emit();
      }
    });
  }
};
