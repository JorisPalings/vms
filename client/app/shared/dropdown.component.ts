import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'profile-dropdown',
  template: `
  <div id="profileDropdown" class="dropdown-content">
    <a routerLink="/settings"><i class="fa fa-cog fa-lg"></i>Settings</a>
    <a (click)="logout()"><i class="fa fa-sign-out fa-lg"></i>Log out</a>
  </div>
  `,
  styleUrls: ['../dist/assets/css/dropdown.css']
})

export class DropdownComponent {

  constructor(private authenticationService: AuthenticationService, private router: Router){}

  logout(){
    this.authenticationService.logout()
      .subscribe(data => {
        // Delete the authentication service data
        this.authenticationService.emptyServiceData();

        // Router back to landing page
        this.router.navigate(['/']);
      })
  }
}
