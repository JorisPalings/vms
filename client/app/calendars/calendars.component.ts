import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'calendars-page',
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
              <div class="step"></div>
              <div class="step current-step"></div>
              <h2 class="form-subtitle">Step 3 - Calendars</h2>
              <div *ngIf="calendarError" class="has-errors">
                <li class="error">
                  {{calendarError}}
                </li>
              </div>
              <p *ngIf="!calendarError" class="align-left">Choose which calendars you would like to import meetings from:</p>

              <form #cals="ngForm" (ngSubmit)="linkCals(cals.value, cals.valid)" class="zebra-form">
                <fieldset *ngFor="let cal of checkboxes">
                    <input name="calendars" value="{{cal.id}}" type="checkbox" id="cal-{{cal.id}}" [(ngModel)]="cal.checked"/>
                    <label for="cal-{{cal.id}}">{{cal.displayOverride || cal.display }}</label>
                </fieldset>
                <button type="submit">Finish</button>
              </form>
          </div>
      </div>
  </div>
  `,
   styleUrls: ['../dist/assets/css/landing-header.css', '../dist/assets/css/calendars.css']
})

export class CalendarsComponent{


  private calendars;
  public checkboxes = [];
  private calendarError;

  constructor(private userService: UserService, private router: Router){}

  ngOnInit(){
    this.userService.getCalendars()
      .subscribe(data => {
        console.log("Data", data);
        this.calendars = data.calendars;
        console.log("Calendars", this.calendars);

        for (let cal of this.calendars){
          this.checkboxes.push(
            {
              display: cal.summary,
              displayOverride: cal.summaryOverride,
              id: cal.id,
              checked: false
            }
          )
        }

      },
      error => {
        this.calendarError = error;
      });
  }

  linkCals(){
    this.userService.linkCalendars(this.getSelectedOptions())
      .subscribe(data => {
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



}
