// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    const user = { username: this.username, password: this.password };
    if (this.authService.login(user)) {
      alert('Success.');
      this.router.navigate(['/dashboard']); // Navigate to the dashboard
    } else {
      alert('Invalid username or password.');
    }
  }
}
