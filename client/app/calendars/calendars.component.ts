import { Component } from '@angular/core';
import { CalendarListComponent } from '../shared/calendar-list.component';

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
                  <calendar-list></calendar-list>
                  <button type="submit">FINISH</button>
              </form>
          </div>
      </div>
  </div>
  `,
   styleUrls: ['../dist/assets/css/landing-header.css']
})

export class CalendarsComponent {}
