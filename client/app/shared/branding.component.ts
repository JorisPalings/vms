import { Component } from '@angular/core';

@Component({
  selector: 'branding',
  template: `
  <div class="branding equal-box">
    <div class="branding-logo">
      <img src="../dist/assets/images/craftworkz.svg">
    </div>
    <div class="branding-text">
      <span>Virtual</span>
      <span>Meeting</span>
      <span>Secretary</span>
    </div>
  </div>
  `,
  styleUrls: ['../dist/assets/css/branding.css']
})

export class BrandingComponent {}
