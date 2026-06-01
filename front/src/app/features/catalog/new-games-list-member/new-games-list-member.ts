import { Component, inject, output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

import { NewGamesListMemberDialog } from '../new-games-list-member-dialog/new-games-list-member-dialog';

@Component({
  selector: 'app-new-games-list-member',
  imports: [MatButton],
  templateUrl: './new-games-list-member.html',
  styleUrl: './new-games-list-member.css',
})
export class NewGamesListMember {
  private dialog = inject(MatDialog);
  gameAdded = output<void>();

  openDialog() {
    const dialogRef = this.dialog.open(NewGamesListMemberDialog);
    dialogRef.afterClosed().subscribe((created: boolean) => {
      if (created) {
        this.gameAdded.emit();
      }
    });
  }
};
