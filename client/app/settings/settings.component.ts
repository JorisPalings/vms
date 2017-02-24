import { Component } from '@angular/core';

@Component({
  selector: 'settings-page',
  template: `
  <header class="private-dash-header">
      <branding></branding>
      <div>
          <h1>Settings</h1>
      </div>
      <profile></profile>
  </header>
  <main>
      <div class="container">
          <div class="row">
              <div class="form five columns">
                  <h2>Profile information</h2>
                  <form>
                      <label for="first-name">First name:</label>
                      <input type="text" id="first-name" />
                      <label for="last-name">Last name:</label>
                      <input type="text" id="last-name" />
                      <label for="email">Email:</label>
                      <input type="email" id="email" />
                      <label for="phone">Telephone number:</label>
                      <input type="tel" id="phone" />
                      <button><i class="fa fa-floppy-o"></i> Save changes</button>
                      <a href="#" class="align-left">Change password</a>
                      <a href="#" class="align-right dangerous">Delete account</a>
                  </form>
              </div>
              <div class="form six columns offset-by-one">
                  <h2>Integrations</h2>
                  <button class="integration-button google">Google</button>
                  <button class="integration-button linkedin">LinkedIn</button>
              </div>
          </div>
      </div>
  </main>
  `,
  styleUrls: ['../dist/assets/css/settings.css']
})

export class SettingsComponent {}
