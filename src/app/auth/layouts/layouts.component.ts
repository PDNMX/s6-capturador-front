import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.css'],
})
export class LayoutsComponent implements OnInit {
  showMenuRecord: boolean = false;
  contractID: string | null = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.router.url === '/') {
          this.showMenuRecord = false;
        } else {
          this.showMenuRecord = true;
        }
      });

    const recordID = localStorage.getItem('record');

    // en caso de refresh valida mostrar el menu superior
    if (recordID) this.showMenuRecord = true;
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
