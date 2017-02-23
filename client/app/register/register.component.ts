import { Component } from '@angular/core';

@Component({
  selector: 'register-page',
  template: `
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
      <div class="row form full-height center-content-vertically">
          <div class="one-half column offset-by-three center-content">
              <registration-form></registration-form>
          </div>
      </div>
    </div>
  `,
   styleUrls: ['../dist/assets/css/landing-header.css']
})

export class RegisterComponent {}
