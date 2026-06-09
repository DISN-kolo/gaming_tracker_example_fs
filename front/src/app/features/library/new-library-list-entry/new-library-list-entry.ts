import { Component, inject, output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

import { NewLibraryListEntryDialog } from '../new-library-list-entry-dialog/new-library-list-entry-dialog';

@Component({
  selector: 'app-new-library-list-entry',
  imports: [MatButton],
  templateUrl: './new-library-list-entry.html',
  styleUrl: './new-library-list-entry.css',
})
export class NewLibraryListEntry {
  private dialog = inject(MatDialog);
  libraryEntryAdded = output<void>();

  openDialog() {
    const dialogRef = this.dialog.open(NewLibraryListEntryDialog);
    dialogRef.afterClosed().subscribe((created: boolean) => {
      console.log("dialog closed with: ", created);
      if (created) {
        this.libraryEntryAdded.emit();
      }
    });
  }
};
