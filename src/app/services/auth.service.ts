import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;
  public username: string = ''; // Store the username globally
  private inactivityTimer: any;
  private readonly TIMEOUT_DURATION = 60000; // 1 minute in milliseconds

  constructor() {
    this.startInactivityTimer(); // Start the inactivity timer on service initialization
  }

  login(user: { username: string; password: string }): Promise<boolean> {
    return fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
        expiresInMins: 30
      }),
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => {
        if (data.accessToken) {
          this.token = data.accessToken;
          localStorage.setItem('authToken', data.accessToken);
          this.resetInactivityTimer(); // Reset inactivity timer on successful login
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
        if (data.username) {
          this.username = data.username;
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
    clearTimeout(this.inactivityTimer); // Clear inactivity timer on logout
    console.log("Logged out due to inactivity");
  }

  private startInactivityTimer() {
    this.resetInactivityTimer();
    window.addEventListener('mousemove', () => this.resetInactivityTimer());
    window.addEventListener('keydown', () => this.resetInactivityTimer());
    window.addEventListener('click', () => this.resetInactivityTimer());
  }

  private resetInactivityTimer() {
    if (this.isAuthenticated()) { // Only reset if the user is authenticated
      clearTimeout(this.inactivityTimer);
      this.inactivityTimer = setTimeout(() => {
        if (this.isAuthenticated()) {
          this.logout();
        }
      }, this.TIMEOUT_DURATION);
    }
  }
}
