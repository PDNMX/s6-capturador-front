import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.css'],
})
export class LayoutsComponent {
  token: string;
  constructor(private auth: AuthService, private router: Router) {
    this.token = auth.getToken();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
