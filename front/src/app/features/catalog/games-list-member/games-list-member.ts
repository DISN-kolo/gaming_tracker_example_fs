import { Component, inject, input, output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { GameKebabMenu } from '../../../shared/components/game-kebab-menu/game-kebab-menu';
import { GameDetailDialog } from '../../../shared/components/game-detail-dialog/game-detail-dialog';
import { CompletionStatus } from '../../../shared/models/completion-status';

@Component({
  selector: 'app-games-list-member',
  imports: [GameKebabMenu],
  templateUrl: './games-list-member.html',
  styleUrl: './games-list-member.css',
})
export class GamesListMember {
  private dialog = inject(MatDialog);
  catalogDeletionHappened = output<void>();

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
      data: { isOwner: this.isOwner(), gameId: this.game().id, onLibraryChanged: () => this.libraryChanged.emit() },
    });
  }

  onCatalogDeletionHappened() {
    this.libraryChanged.emit();
  }
}
