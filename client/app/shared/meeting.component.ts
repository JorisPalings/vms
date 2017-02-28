import { Component, Input } from '@angular/core';
import { Meeting } from '../_models/meeting';

@Component({
  selector: 'meeting',
  template: `
  <div class="card-wrapper">
    <div class="meeting-card">
      <span class="time-box">
            <div class="time-box-container">
              <span class="start-time">{{meeting.start | date:'HH:mm'}}</span>
      <span> - </span>
      <span class="end-time">{{meeting.end | date:'HH:mm'}}</span>
    </div>
    </span>
    <span class="meeting-info">
            <p><span *ngFor="let external of meeting.externals === undefined? meeting.meetees : meeting.externals; let isLast=last">{{external.fname}} {{external.lname}}{{isLast ? '' : ', '}}</span></p>
            <p>{{meeting.summary}}</p>
            <p>{{meeting.room === undefined ? 'Room is not set for meeting' : meeting.room}}</p>
          </span>
    <span class="profile-image">
            <img src="{{meeting.externals[0] === undefined ? 'https://s-media-cache-ak0.pinimg.com/originals/36/06/ce/3606cebe8d048b71aaea38b52c4eb4bd.jpg': meeting.externals[0].pictureURL}}">
          </span>
  </div>
  <div class="bell">
    <span>Running late</span>
  </div>
</div>
  `,
  styleUrls: ['../dist/assets/css/meeting.css']
})

export class MeetingComponent {
    @Input() meeting: Meeting;
}
