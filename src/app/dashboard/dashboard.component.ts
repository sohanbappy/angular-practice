import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrls: ['./dashboard.component.scss'], // Corrected here
})
export class DashboardComponent {
  constructor(private router: Router, private authService: AuthService) {}

  logout() {
    localStorage.removeItem('auth');
 
    this.router.navigate(['/login']);
  }

  getUsername(): string {
    const authData = localStorage.getItem('auth');
    if (authData) {
      const user = JSON.parse(authData);
      return user.username;
    }
    return '';
  }
}
