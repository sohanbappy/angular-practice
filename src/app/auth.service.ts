// src/app/auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private validUser = { username: 'bappy', password: '1234' };

  login(user: { username: string; password: string }): boolean {
    if (user.username === this.validUser.username && user.password === this.validUser.password) {
      localStorage.setItem('auth', JSON.stringify(user));
      return true;
    }
    return false;
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('auth') !== null;
  }
}
