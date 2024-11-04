import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public-info',
  standalone: true,
  imports: [],
  templateUrl: './public-info.component.html',
  styleUrl: './public-info.component.scss'
})
export class PublicInfoComponent {

  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }

}
