import { Component, input } from '@angular/core';

@Component({
  selector: 'app-library-entry',
  templateUrl: './library-entry.html'
})
export class LibraryEntry {
  game = input.required<{ id: string, title: string, submittedBy: string | null }>();
};
