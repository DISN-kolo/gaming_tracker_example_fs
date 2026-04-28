import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(`${environment.apiUrl}/api/auth/login/`, { email, password });
  };
  register(email: string, password: string, username: string) {
    return this.http.post<{ token: string }>(`${environment.apiUrl}/api/auth/register/`, { email, password, name: username });
  };
  me() {
    return this.http.get<{ username: string, email: string }>(`${environment.apiUrl}/api/auth/me/`);
  };
};
