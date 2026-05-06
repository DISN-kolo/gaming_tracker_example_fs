import { Component, input } from '@angular/core';

@Component({
  selector: 'app-game-entry',
  templateUrl: './game-entry.html'
})
export class GameEntry {
  game = input.required<{ id: string, title: string, submittedBy: string | null }>();
};
