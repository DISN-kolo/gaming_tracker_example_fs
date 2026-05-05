import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);

  me() {
    return this.http.get<{ username: string, email: string }>(`${environment.apiUrl}/api/auth/me/`);
  };
};
