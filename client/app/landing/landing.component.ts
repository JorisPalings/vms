import { Component } from '@angular/core';
import { LoginComponent } from './login.component';

@Component({
  selector: 'landing-page',
  template: `
  <div class="full-container">
    <header>
      <div class="front-branding">
        <div class="logo">
          <img src="./dist/assets/images/craftworkz.svg"/>
        </div>
        <div class="text-branding">
          Virtual Meeting Secretary
        </div>
      </div>
    </header>
    <div class="container">
        <div class="row full-height center-content-vertically">
            <div class="one-half column offset-by-three center-content">
                <login-form></login-form>
            </div>
        </div>
    </div>
  </div>
  `,
  styleUrls: ['../dist/assets/css/landing-header.css']
})

export class LandingComponent {}
