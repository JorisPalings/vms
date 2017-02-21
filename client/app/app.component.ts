import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <div class="title">
      <h1>My App</h1>
    </div>
    <main>
      <router-outlet></router-outlet>
    </main>

  `,
  styles: [`
    .title {
      color: red;
    }
  `]
})

export class AppComponent {}
