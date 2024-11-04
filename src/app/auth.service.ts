import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;
  public username: string = ''; // Store the username globally

  constructor() {}

  login(user: { username: string; password: string }): Promise<boolean> {
    return fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        //emilys, emilyspass
        //ethanm, ethanmpass
        //logant, logantpass
        username: user.username,
        password: user.password,
        expiresInMins: 30
      }),
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => {
        console.log("Login Response:", data);

        if (data.accessToken) {
          // console.log("AccessToken: " + data.accessToken);
          this.token = data.accessToken;
          localStorage.setItem('authToken', data.accessToken);
          return this.fetchUserDetails();
        }
        return false;
      })
      .catch(error => {
        console.error("Login Error:", error);
        return false;
      });
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
        console.log("User Details Response:", data);

        if (data.username) {
          this.username = data.username; // Store username
          return true;
        }
        return false;
      })
      .catch(error => {
        console.error("User Details Error:", error);
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
