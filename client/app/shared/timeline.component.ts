
import { Component, OnInit } from '@angular/core';
import { DropdownComponent } from './dropdown.component';
import { MeetingComponent } from './meeting.component';
import { MeetingService } from './services/meeting.service';

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

export class TimelineComponent implements OnInit {
    constructor(private meetingService: MeetingService){}

    ngOnInit() {
        this.meetingService.getAllMeetings().subscribe(data => console.log(data));
    }
}
