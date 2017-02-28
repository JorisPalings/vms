
import { Component, OnInit } from '@angular/core';
import { DropdownComponent } from './dropdown.component';
import { MeetingComponent } from './meeting.component';
import { MeetingService } from './services/meeting.service';
import { Meeting } from '../_models/meeting';

@Component({
  selector: 'timeline',
  template: `
  <section>
    <div class="timerow" *ngFor="let day of meetings">
      <div class="date">{{day[0].start | date:'EEE, d MMM, y'}}</div>
      <meeting *ngFor="let meeting of day" [meeting]="meeting"></meeting>
    </div>
  </section>
  `,
  styleUrls: ['../dist/assets/css/timeline.css']
})

export class TimelineComponent implements OnInit {
    private meetings: any[];

    constructor(private meetingService: MeetingService){}

    ngOnInit() {
        this.meetingService.getAllMeetings().subscribe(data => this.processMeetings(data));
    }

    processMeetings(meetings: Meeting[]) {
        let number = 0;
        meetings.sort(function(a,b){
            return +new Date(a.start) - +new Date(b.start);
        });
        for(let index in meetings){
            let start = new Date(meetings[index].start);
            if(start < new Date(Date.now())){
                number = +index;
            }
        }
        meetings.splice(0, number+1);

        let meetingsJson = [];
        let date;
        for(let meeting of meetings) {
            if(date !== new Date(meeting.start).toLocaleDateString()) {
                date = new Date(meeting.start).toLocaleDateString();
                meetingsJson.push([]);
            }
            meetingsJson[meetingsJson.length-1].push(meeting);
        }

        console.log(meetingsJson);

        this.meetings = meetingsJson;
    }
}
