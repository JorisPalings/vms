import { Component, Input, OnInit } from '@angular/core';
import { Meeting } from '../_models/meeting';
import { ActivatedRoute } from '@angular/router';
import { MeetingService } from '../shared/services/meeting.service';

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
    private meetingId: string;
    private sub: any;

    constructor(private route: ActivatedRoute, private meetingService: MeetingService){}

    ngOnInit(){
      this.sub = this.route.params.subscribe(params => {
      this.meetingId = params['id']; // (+) converts string 'id' to a number

       //TODO: Load the meeting detail using MeetingService

       this.meetingService.getMeeting(this.meetingId)
        .subscribe(data => {
          console.log("Meeting Details: ", data);

          //TODO: Use the data containing the meeting

          // this.meeting = <Meeting>({
          //   externalID: data.externalID,
          //   summary: data.summary,
          //   room: data.room,
          //   start: data.start,
          //   end: data.end,
          //   externals: data.externals,
          //   meetees: data.meetees
          // })

        },
        error => console.log(error));

     });
    }

    ngOnDestroy() {
      this.sub.unsubscribe();
    }

}
