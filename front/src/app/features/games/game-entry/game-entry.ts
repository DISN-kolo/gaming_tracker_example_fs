import { Component, inject, input, output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { GameKebabMenu } from '../game-kebab-menu/game-kebab-menu';
import { GameDetailDialog } from '../game-detail-dialog/game-detail-dialog';
import { CompletionStatus } from '../../../shared/models/completion-status';

@Component({
  selector: 'app-game-entry',
  imports: [GameKebabMenu],
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
  libEntry = input<{ status: CompletionStatus, rating: number | null }>();
  isOwner = input.required<boolean>();
  libraryChanged = output<void>();

  openDetailDialog() {
    this.dialog.open(GameDetailDialog, {
      width: '480px',
      data: { gameId: this.game().id, onLibraryChanged: () => this.libraryChanged.emit() },
    });
  }
}
