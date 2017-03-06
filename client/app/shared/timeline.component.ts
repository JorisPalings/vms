import { Component, OnInit, Input } from '@angular/core';
import { DropdownComponent } from './dropdown.component';
import { MeetingComponent } from './meeting.component';
import { MeetingService } from './services/meeting.service';
import { Meeting } from '../_models/meeting';
import { AuthenticationService } from '../shared/services/authentication.service';
import { Router } from '@angular/router';

@Component({
    selector: 'timeline',
    template: `
  <section>
    <div *ngIf="errorMessage" class="has-errors container">
      <li class="error">
        {{errorMessage}}
      </li>
    </div>
    <div class="timerow" *ngFor="let day of meetings">
      <div class="date">{{processDate(day[0].start)}}</div>
      <div class="vertical">
        <meeting *ngFor="let meeting of day" [meeting]="meeting" [isPublic]="isPublic"></meeting>
      </div>
    </div>
  </section>
  `,
    styleUrls: ['../dist/assets/css/timeline.css']
})

export class TimelineComponent implements OnInit {
    @Input()
    private isPublic: boolean;
    private meetings: any[];
    private past: any[] = [];
    private now: Date;
    private tomorrow: Date;
    private errorMessage: string;

    constructor(private meetingService: MeetingService, private authenticationService: AuthenticationService, private router: Router) { }

    ngOnInit() {
        this.fetchData(this.meetingService, this.authenticationService, this.router);
    }

    fetchData(meetingService, authenticationService, router) {
        this.now = new Date();
        this.tomorrow = new Date();
        this.tomorrow.setDate(this.tomorrow.getDate() + 1);

        if (!authenticationService.isAuthenticated()) {
            router.navigate(['/']);
        } else {
            if (!this.isPublic) {
                meetingService.getAllMeetingsForOneUser()
                    .subscribe(data => {
                        this.processMeetings(data)
                    },
                    error => {
                        this.errorMessage = error;
                    });
            } else {
                meetingService.getAllMeetings()
                    .subscribe(data => {
                        this.processMeetings(data)
                    },
                    error => {
                        this.errorMessage = error;
                    });
            }
        }
        let refresh = setTimeout(() => {this.fetchData(meetingService, authenticationService, router)}, 60000);
    }

    processMeetings(meetings: Meeting[]) {
        this.meetingService.setMeetings(meetings);
        let number = 0;
        meetings.sort(function(a, b) {
            return +new Date(a.start) - +new Date(b.start);
        });
        for (let index in meetings) {
            let start = new Date(meetings[index].end);
            if (start < new Date(Date.now())) {
                number = +index;
            }
        }

        this.past.push(meetings.splice(0, number + 1));

        let meetingsJson = [];
        let date;
        for (let meeting of meetings) {
            if (date !== new Date(meeting.start).toLocaleDateString()) {
                date = new Date(meeting.start).toLocaleDateString();
                meetingsJson.push([]);
            }
            meetingsJson[meetingsJson.length - 1].push(meeting);
        }

        this.meetings = meetingsJson;
    }

    processDate(date: string) {
        let dateString;
        let now = this.now.toDateString();
        let tomorrow = this.tomorrow.toDateString();
        if (new Date(date).toDateString() == now) {
            dateString = 'Today';
        } else if (new Date(date).toDateString() == tomorrow) {
            dateString = 'Tomorrow';
        }
        else {
            dateString = new Date(date).toDateString();
        }
        return dateString;
    }
}
