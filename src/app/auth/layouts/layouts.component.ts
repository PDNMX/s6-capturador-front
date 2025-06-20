import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.css'],
})
export class LayoutsComponent implements OnInit {
  showMenuRecord: boolean = false;
  contractID: string | null = '';
  username: string = '';
  roles: string[] = [];

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.roles = this.auth.getRoles();
    this.username = this.auth.getUsername();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        console.log('this.router.url: ', this.router.url);

        if (this.router.url === '/' || this.router.url.includes('management')) {
          this.showMenuRecord = false;
        } else {
          this.showMenuRecord = true;
        }
      });

    this.contractID = localStorage.getItem('record');

    // en caso de refresh valida mostrar el menu superior
    if (this.contractID) this.showMenuRecord = true;
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
