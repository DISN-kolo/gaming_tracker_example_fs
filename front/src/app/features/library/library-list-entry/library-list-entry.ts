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
        id: this.libraryElement().id,
        title: this.libraryElement().title,
        releaseYear: this.libraryElement().releaseYear,
        description: this.libraryElement().description,
        submittedById: this.libraryElement().submittedById,
        status: this.libraryElement().status as CompletionStatus,
        rating: this.libraryElement().rating,
        onLibraryChanged: () => this.libraryChanged.emit(),
        isOwner: this.isOwner(),
      },
    });
  }

  onCatalogDeletionHappened() {
    this.libraryChanged.emit();
  }
}
