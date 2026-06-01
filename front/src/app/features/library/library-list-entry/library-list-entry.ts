import { Component, inject, input, output, computed } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { GameKebabMenu } from '../../../shared/components/game-kebab-menu/game-kebab-menu';
import { LibraryDetailDialog } from '../library-detail-dialog/library-detail-dialog';
import { CompletionStatus } from '../../../shared/models/completion-status';

@Component({
  selector: 'app-library-list-entry',
  imports: [GameKebabMenu],
  templateUrl: './library-list-entry.html',
  styleUrl: './library-list-entry.css',
})
export class LibraryListEntry {
  private dialog = inject(MatDialog);
  catalogDeletionHappened = output<void>();

  libraryElement = input.required<{
    id: string,
    title: string,
    releaseYear: number | null,
    description: string | null,
    submittedById: string | null,
    status: CompletionStatus,
    rating: number | null,
  }>();
  libraryChanged = output<void>();
  isOwner = computed(() => {
    const userId = this.userinfo()?.id;
    if (!userId) {
      return false;
    }
    const l = this.libraryElement() ?? {submittedById: " "};
    return l.submittedById === userId;
  });

  openDetailDialog() {
    this.dialog.open(LibraryDetailDialog, {
      data: {
        id: e.id,
        title: e.title,
        releaseYear: e.releaseYear,
        description: e.description,
        submittedById: e.submittedById,
        status: e.status as CompletionStatus,
        rating: e.rating,
        onLibraryChanged: () => this.libraryChanged.emit()
      },
    });
  }

  onCatalogDeletionHappened() {
    this.libraryChanged.emit();
  }
}
