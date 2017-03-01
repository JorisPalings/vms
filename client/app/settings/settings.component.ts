import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';

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
                  <form #cals="ngForm" (ngSubmit)="linkCals(cals.value, cals.valid)" class="zebra-form">
                    <fieldset *ngFor="let cal of checkboxes">
                        <input name="calendars" value="{{cal.id}}" type="checkbox" id="cal-{{cal.id}}" checked="{{cal.checked}}" (change)="checkboxClicked(cal)"/>
                        <label for="cal-{{cal.id}}">{{cal.displayOverride || cal.display }}</label>
                    </fieldset>
                    <button type="submit">Finish</button>
                  </form>
              </div>
          </div>
      </div>
  </main>
  `,
  styleUrls: ['../dist/assets/css/settings.css']
})

export class SettingsComponent {

  private calendars;
  public checkboxes = [];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getCalendars()
      .subscribe(data => {
        console.log("Data", data);
        this.calendars = data.calendars;
        console.log("Calendars", this.calendars);

        this.userService.getCurrentCalendars()
          .subscribe(data => {
            console.log("DATA", data.calendars);

            for (let cal of this.calendars) {
              let isChecked = "";
              if(data.calendars.includes(cal.id)) {
                isChecked = "checked";
              }
              this.checkboxes.push(
                {
                  display: cal.summary,
                  displayOverride: cal.summaryOverride,
                  id: cal.id,
                  checked: isChecked
                }
              )
            }
            console.log(this.checkboxes);
          });
      },
      error => console.log(error));
  }

  linkCals() {
    this.userService.linkCalendars(this.getSelectedOptions())
      .subscribe(data => {
        // successful
        console.log("successful data", data);

        // Route to private dashboard
        this.router.navigate(['/private-dashboard']);
      },
      error => console.error(error));
  }

  getSelectedOptions() {
    return this.checkboxes
      .filter(cal => cal.checked)
      .map(cal => cal.id)
  }

  checkboxClicked(cal) {
    cal.checked = (cal.checked === "checked") ? "" : "checked";
    this.checkboxes[this.checkboxes.indexOf(cal)] = cal;
  }

}
