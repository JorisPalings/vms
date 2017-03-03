import { Component, Input } from '@angular/core';
import { Meeting } from '../_models/meeting';

@Component({
  selector: 'meeting',
  template: `
  <div class="card-wrapper">
    <div class="meeting-card" [routerLink]="['/meeting', meeting.id]">
      <span class="time-box">
        <div class="time-box-container">
          <span class="start-time">{{meeting.start | date:'HH:mm'}}</span>
          <span> - </span>
          <span class="end-time">{{meeting.end | date:'HH:mm'}}</span>
        </div>
      </span>
      <span class="meeting-info">
        <p><i class="fa fa-fw fa-users"></i><span *ngFor="let external of meeting.externals.length === 0 ? meeting.meetees : meeting.externals; let isLast=last">{{external.fname}} {{external.lname}}{{isLast ? '' : ', '}}</span></p>
        <p><i class="fa fa-fw fa-folder"></i>{{meeting.summary}}</p>
        <p><i class="fa fa-fw fa-map-marker"></i>{{meeting.room === undefined ? 'No room has been set for this meeting' : meeting.room}}</p>
      </span>
      <span class="profile-image">
        <img src="{{meeting.externals[0] === undefined ? (meeting.meetees[0] === undefined ? 'https://cdn-images-1.medium.com/max/800/0*9BYGa20RkF4rTpJU.png' : meeting.meetees[0].pictureURL ) : meeting.externals[0].pictureURL}}">
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
