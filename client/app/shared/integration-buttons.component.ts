import { Component } from '@angular/core';

@Component({
  selector: 'integration-buttons',
  template: `
  <button class="integration-button google">Google</button>
  <button class="integration-button linkedin">LinkedIn</button>
  `,
   styleUrls: ['../dist/assets/css/integrations.css']
})

export class IntegrationButtonsComponent {}
