import { Component } from '@angular/core';

@Component({
  selector: 'meeting',
  template: `
  <div class="card-wrapper">
    <div class="meeting-card">
      <span class="time-box">
            <div class="time-box-container">
              <span class="start-time">10:00</span>
      <span> - </span>
      <span class="end-time">11:00</span>
    </div>
    </span>
    <span class="meeting-info">
            <p>Sander Lenaerts</p>
            <p>Virtual Meeting Secretary</p>
            <p>Everest</p>
          </span>
    <span class="profile-image">
            <img src="https://s-media-cache-ak0.pinimg.com/originals/36/06/ce/3606cebe8d048b71aaea38b52c4eb4bd.jpg">
          </span>
  </div>
  <div class="bell">
    <span>Running late</span>
  </div>
</div>
  `,
  styleUrls: ['../dist/assets/css/meeting.css']
})

export class MeetingComponent {}
