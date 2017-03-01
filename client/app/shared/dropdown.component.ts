import { Component } from '@angular/core';

@Component({
  selector: 'profile-dropdown',
  template: `
  <div id="profileDropdown" class="dropdown-content">
    <a href="/settings"><i class="fa fa-cog fa-lg"></i>Settings</a>
    <a href="#"><i class="fa fa-sign-out fa-lg"></i>Log out</a>
  </div>
  `,
  styleUrls: ['../dist/assets/css/dropdown.css']
})

export class DropdownComponent {}
