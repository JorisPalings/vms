import { Component } from '@angular/core';
import { TimelineComponent } from '../shared/timeline.component';

@Component({
  selector: 'private-dashboard',
  template: `
  <header class="private-dash-header">
    <branding></branding>
    <h1>Meetings</h1>
    <profile></profile>
  </header>
  <main>
    <timeline></timeline>
  </main>
  `,
  styleUrls: ['../dist/assets/css/private-dash.css']
})

export class PrivateDashboardComponent {}
