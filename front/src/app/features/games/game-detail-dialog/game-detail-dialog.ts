import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { forkJoin } from 'rxjs';
import {
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

import { GameService } from '../../../core/game/game.service';

@Component({
  selector: 'app-game-detail-dialog',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButton],
  templateUrl: './game-detail-dialog.html',
  styleUrl: './game-detail-dialog.css',
})
export class GameDetailDialog {
  private gameService = inject(GameService);
  private gameId: string = inject(MAT_DIALOG_DATA);

  detail = toSignal(
    forkJoin({
      game: this.gameService.getById(this.gameId),
      avgRating: this.gameService.getAverageRating(this.gameId),
    })
  );
}
