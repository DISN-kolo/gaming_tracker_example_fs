import { Component, inject, input, output, computed } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { toSignal } from '@angular/core/rxjs-interop';

import { UserService } from '../../../core/user/user.service';

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
  userService = inject(UserService);
  userinfo = toSignal(this.userService.me());
  catalogDeletionHappened = output<void>();

  libraryEntry = input.required<{
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
    const l = this.libraryEntry() ?? {submittedById: " "};
    return l.submittedById === userId;
  });

  openDetailDialog() {
    this.dialog.open(LibraryDetailDialog, {
      data: {
        id: this.libraryEntry().id,
        title: this.libraryEntry().title,
        releaseYear: this.libraryEntry().releaseYear,
        description: this.libraryEntry().description,
        submittedById: this.libraryEntry().submittedById,
        status: this.libraryEntry().status as CompletionStatus,
        rating: this.libraryEntry().rating,
        onLibraryChanged: () => this.libraryChanged.emit(),
        isOwner: this.isOwner(),
      },
    });
  }

  onCatalogDeletionHappened() {
    this.libraryChanged.emit();
  }
}
