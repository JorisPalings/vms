import { Component } from '@angular/core';
import { IntegrationButtonsComponent } from '../shared/integration-buttons.component';

@Component({
  selector: 'integrations-page',
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
              <h1 class="form-title">Registration</h1>
              <div class="step"></div>
              <div class="step current-step"></div>
              <div class="step"></div>
              <h2 class="form-subtitle">Step 2 - Integrations</h2>
              <p class="successful align-left"><i class="fa fa-check"></i> Your account has been created!</p>
              <p class="align-left">Link your account with Google and LinkedIn below:</p>
              <form>
                  <integration-buttons></integration-buttons>
                  <button type="submit">NEXT</button>
              </form>
          </div>
      </div>
  </div>
  `,
   styleUrls: ['../dist/assets/css/landing-header.css', '../dist/assets/css/integrations.css']
})

export class IntegrationsComponent {}
