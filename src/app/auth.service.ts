import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;
  public username: string = ''; // Store the username

  constructor() {}

  login(user: { username: string; password: string }): Promise<boolean> {
    return fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
//         username: 'emilys',
//         password: 'emilyspass',
        username: user.username,
        password: user.password,
        expiresInMins: 30
      }),
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          console.log("AccessToken: "+data.token);

          this.token = data.token;
          localStorage.setItem('authToken', data.token); // Store token in localStorage
          return this.fetchUserDetails();
        }
        return false;
      })
      .catch(() => false);
  }

  fetchUserDetails(): Promise<boolean> {
    if (!this.token) return Promise.resolve(false);

    return fetch('/auth/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.token}`
      },
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => {
        if (data.username) {
          console.log("User Details: "+data)

          this.username = data.username; // Store username
          return true;
        }
        return false;
      });
  }

  getUsername(): string {
    return this.username;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('authToken');
  }
}
