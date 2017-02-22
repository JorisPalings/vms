
import { Component } from '@angular/core';
import { DropdownComponent } from './dropdown.component';

@Component({
  selector: 'profile',
  template: `
  <div class="profile">
    <span>Firstname Lastname</span>
    <div class="profile-image dropdown">
      <img class="img-profile" onclick="triggerProfileDropdown()" src="https://s-media-cache-ak0.pinimg.com/originals/36/06/ce/3606cebe8d048b71aaea38b52c4eb4bd.jpg">
      <profile-dropdown></profile-dropdown>
    </div>
  </div>
  `,
  styleUrls: ['../dist/assets/css/profile.css']
})

export class ProfileComponent {}
