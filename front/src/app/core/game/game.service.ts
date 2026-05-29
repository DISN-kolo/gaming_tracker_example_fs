import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompletionStatus } from '../../shared/models/completion-status';

import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class GameService {
  private http = inject(HttpClient);

  getLibrary() {
    return this.http.get<{
      id: string,
      title: string,
      releaseYear: number | null,
      description: string | null,
      submittedById: string | null,
      status: CompletionStatus,
      rating: number | null,
    }[]>(`${environment.apiUrl}/api/games/library`);
  };
  getGames() {
    return this.http.get<{
      id: string,
      title: string,
      releaseYear: number | null,
      description: string | null,
      submittedById: string | null,
    }[]>(`${environment.apiUrl}/api/games`);
  };

  getById(id: string) {
    return this.http.get<{
      id: string,
      title: string,
      releaseYear: number | null,
      description: string | null,
      submittedById: string | null,
    }>(`${environment.apiUrl}/api/games/${id}`);
  };

  getAverageRating(id: string) {
    return this.http.get<{ averageRating: number | null }>(
      `${environment.apiUrl}/api/games/${id}/avgrating`
    );
  };

  getByIdFromLibrary(id: string) {
    return this.http.get<{
      id: string,
      title: string,
      releaseYear: number | null,
      description: string | null,
      submittedById: string | null,
      status: CompletionStatus | null,
      rating: number | null,
    }>(`${environment.apiUrl}/api/games/${id}/library`);
  };

  addToLibrary(gameId: string, status: CompletionStatus, rating: number | null) {
    return this.http.post<void>(
      `${environment.apiUrl}/api/games/${gameId}/library`,
      { status, rating }
    );
  };

  editInLibrary(gameId: string, status: CompletionStatus, rating: number | null) {
    return this.http.put<void>(
      `${environment.apiUrl}/api/games/${gameId}/library`,
      { status, rating }
    );
  };

  removeFromLibrary(gameId: string) {
    return this.http.delete<void>(
      `${environment.apiUrl}/api/games/${gameId}/library`
    );
  };

  createGame(title: string, releaseYear: number | null, description: string | null) {
    return this.http.post<{ id: string, title: string, releaseYear: number | null, description: string | null, submittedById: string | null }>(
      `${environment.apiUrl}/api/games`,
      { title, releaseYear, description }
    );
  };

  removeFromCatalog(gameId: string) {
    return this.http.delete<void>(
      `${environment.apiUrl}/api/games/${gameId}`
    );
  };

};
