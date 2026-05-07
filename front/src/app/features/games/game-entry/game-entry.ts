import { Component, input } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-game-entry',
  imports: [MatIconButton, MatIcon],
  templateUrl: './game-entry.html',
  styleUrl: './game-entry.css',
})
export class GameEntry {
  game = input.required<{
    id: string,
    title: string,
    releaseYear: number | null,
    description: string | null,
    submittedById: string | null,
  }>();
}
