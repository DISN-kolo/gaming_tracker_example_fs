import { Component, inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogTitle,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { A11yModule } from '@angular/cdk/a11y';

@Component({
  selector: 'app-library-add-dialog-quit-warning',
  imports: [
    MatDialogTitle,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    A11yModule,
  ],
  templateUrl: './library-add-dialog-quit-warning.html',
  styleUrl: './library-add-dialog-quit-warning.css',
})
export class LibraryAddDialogQuitWarning {
  private dialogRef = inject(MatDialogRef<LibraryAddDialogQuitWarning>);

  yesAndDeleteGame() {
    this.dialogRef.close("delete");
  }

  yesAndKeepGame() {
    this.dialogRef.close("keep");
  }
}
