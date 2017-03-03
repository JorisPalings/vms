
import { Component, OnInit, Input } from '@angular/core';
import { DropdownComponent } from './dropdown.component';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'profile',
  template: `
  <div class="profile">
    <span>{{name}}</span>
    <div class="profile-image dropdown">
      <img class="img-profile" onclick="triggerProfileDropdown()" src="{{picture}}">
      <profile-dropdown></profile-dropdown>
    </div>
  </div>
  `,
  styleUrls: ['../dist/assets/css/profile.css']
})

export class ProfileComponent implements OnInit {

  @Input()
  public name;

  public picture;

  constructor(private authenticationService: AuthenticationService, private router: Router){}

  ngOnInit(){
    this.authenticationService.requestUserData()
    .subscribe(data => {
      this.name = data.fname + " " + data.lname;
      this.picture = data.pictureURL;
    })
  }


}
