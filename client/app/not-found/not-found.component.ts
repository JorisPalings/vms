import { Component } from '@angular/core';

@Component({
  template: `
    <div class="not-found">
      <p>404 Not Found</p>
      <p>You may be lost. Follow the breadcrumbs back <a routerLink = "/"> home </a>.</p>
    </div>
  `
})

export class NotFoundComponent {}
