import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class GameService {
  private http = inject(HttpClient);

  getLibrary() {
    return this.http.get<{ id: string, title: string, submittedBy: string | null }[]>(`${environment.apiUrl}/api/games/library`);
  };
  getGames() {
    return this.http.get<{ id: string, title: string, submittedBy: string | null }[]>(`${environment.apiUrl}/api/games`);
  };
};
