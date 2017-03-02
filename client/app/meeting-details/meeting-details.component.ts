import { Component, Input } from '@angular/core';
import { Meeting } from '../_models/meeting';

@Component({
  selector: 'meeting-details',
  template: `
  <header class="private-dash-header">
	  <branding></branding>
    <h1>Meeting</h1>
    <profile></profile>
  </header>
  <main>
    <div class="container">
      <div class="row">
        <h2>{{meeting.summary}}</h2>
        <h3>{{meeting.start}} {{meeting.end}}</h3>
        <h3>{{meeting.room}}</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem quasi sunt ipsum magni, doloribus commodi, quas, iure soluta possimus illo dignissimos. Perferendis autem corrupti, minima quidem expedita natus qui assumenda.</p>
        <div class="one-half column offset-by-three">
          <form>
            <button><i class="fa fa-pencil-square-o"></i> View previous notes</button>
          </form>
        </div>
        <div class="row">
          <participant class="one-half column"></participant>
          <participant class="one-half column"></participant>
        </div>
        <div class="row">
          <participant class="one-half column"></participant>
          <participant class="one-half column"></participant>
        </div>
      </div>
    </div>
  </main>
  `,
  styleUrls: ['../dist/assets/css/meeting-details.css']
})

export class MeetingDetailsComponent {
    @Input()
    private meeting: Meeting;
}
