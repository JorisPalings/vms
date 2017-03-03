import { Component } from '@angular/core';

@Component({
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
    <main>
      <div class="container">
        <div class="not-found center-content center-content-vertically">
          <p class="four-o-four">404 Not Found</p>
          <p>You may be lost. Follow the breadcrumbs back <a routerLink = "/"> home </a>.</p>
        </div>
      </div>
    <main>
  `,
  styleUrls: ['../dist/assets/css/landing-header.css', '../dist/assets/css/not-found.css']
})

export class NotFoundComponent {}
