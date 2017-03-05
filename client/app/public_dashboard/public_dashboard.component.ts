import { Component } from '@angular/core';

@Component({
    selector: 'public-dashboard',
    template: `
  <header class="public-dash-header">
    <branding></branding>
    <h1>Meetings</h1>
    <clock></clock>
  </header>
  <main>
    <timeline [isPublic]="true"></timeline>
  </main>
  `,
  styleUrls: ['../dist/assets/css/public-dash.css']
})

export class PublicDashboardComponent { }
