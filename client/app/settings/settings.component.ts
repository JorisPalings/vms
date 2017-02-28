import { Component } from '@angular/core';
import { CalendarListComponent } from '../shared/calendar-list.component';

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
                      <a href="#" class="float-left">Change password</a>
                      <a href="#" class="float-right dangerous">Delete account</a>
                  </form>
              </div>
              <div class="form six columns offset-by-one">
                  <h2>Integrations</h2>
                  <integration-buttons></integration-buttons>
                  <h2>Calendars</h2>
                  <fieldset *ngFor="let cal of calendars">
                      <input name="calendars" value="{{cal.id}}" type="checkbox" id="cal-{{cal.id}}" />
                      <label for="cal-{{cal.id}}">{{cal.summaryOverride || cal.summary }}</label>
                  </fieldset>
              </div>
          </div>
      </div>
  </main>
  `,
  styleUrls: ['../dist/assets/css/settings.css']
})

export class SettingsComponent {}
