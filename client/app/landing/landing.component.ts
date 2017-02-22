import { Component } from '@angular/core';

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
        <div class="row form full-height center-content-vertically">
            <div class="one-half column offset-by-three center-content">
                <h1 class="form-title">Login</h1>
                <form>
                    <input type="text" placeholder="EMAIL" autofocus />
                    <input type="password" placeholder="PASSWORD" />
                    <span class="form-instruction"><a href="#">Forgot your password?</a></span>
                    <button type="submit">LOG IN</button>
                    <span class="form-instruction">Need an account? <a href="#">Register</a></span>
                </form>
            </div>
        </div>
    </div>
  </div>
  `,
  styleUrls: ['../dist/assets/css/landing-header.css']
})

export class LandingComponent {}
