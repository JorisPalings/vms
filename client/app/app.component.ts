import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <main>
      <router-outlet></router-outlet>
    </main>

  `,
  styleUrls: ['./dist/assets/css/default.css']
})

export class AppComponent {}
