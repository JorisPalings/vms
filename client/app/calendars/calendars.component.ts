import { Component, OnInit } from '@angular/core';
import { CalendarListComponent } from '../shared/calendar-list.component';

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
              <form class="zebra-form">
                <fieldset *ngFor="let cal of calendars">
                    <input name="calendars" value="{{cal.id}}" type="checkbox" id="cal-{{cal.id}}" />
                    <label for="cal-{{cal.id}}">{{cal.summaryOverride || cal.summary }}</label>
                </fieldset>
                <button type="submit">FINISH</button>
              </form>
          </div>
      </div>
  </div>
  `,
   styleUrls: ['../dist/assets/css/landing-header.css', '../dist/assets/css/calendars.css']
})

export class CalendarsComponent{


  private calendars;

  constructor(private userService: UserService, private router: Router){}

  ngOnInit(){
    this.userService.getCalendars()
      .subscribe(data => {
        console.log("Data", data);
        this.calendars = data.calendars;
        console.log("Calendars", this.calendars);
      },
      error => console.log(error));
  }

}
