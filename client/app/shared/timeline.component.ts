
import { Component } from '@angular/core';
import { DropdownComponent } from './dropdown.component';
import { MeetingComponent } from './meeting.component';

@Component({
  selector: 'timeline',
  template: `
  <section>
    <div class="timerow">
      <div class="date">Today</div>
      <meeting></meeting>
    </div>
    <div class="timerow">
      <div class="date"></div>
      <meeting></meeting>
    </div>
    <div class="timerow padded">
      <div class="date">Friday</div>
      <meeting></meeting>
    </div>
    <div class="timerow padded">
      <div class="date">21 Feb 2017</div>
      <meeting></meeting>
    </div>
  </section>
  `,
  styleUrls: ['../dist/assets/css/timeline.css']
})

export class TimelineComponent {}
