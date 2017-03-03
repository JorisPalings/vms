import { Component, Input, OnInit } from '@angular/core';
import { Meeting } from '../_models/meeting';
import { ActivatedRoute } from '@angular/router';
import { MeetingService } from '../shared/services/meeting.service';
import { ModalModule } from 'ngx-modal';

@Component({
    selector: 'meeting-details',
    template: `
  <header class="private-dash-header">
	  <branding></branding>
    <div class="title">
      <a routerLink="/private-dashboard"><i class="fa fa-chevron-left"></i></a>
      <h1>Meeting</h1>
    </div>
    <profile></profile>
  </header>
  <main>
    <div class="container">
      <div class="row">
        <h2>{{meeting.summary}}</h2>
        <h3>{{processDate(meeting.start)}}, {{meeting.start | date:'HH:mm'}} - {{processDate(meeting.end)}}, {{meeting.end | date:'HH:mm'}}</h3>
        <h3>{{meeting.room}}</h3>
        <p >{{meeting.description || 'No description has been set for this meeting.'}}</p>

        <div class="one-half column offset-by-three">
          <form>
            <button type="submit" routerLink="/projects"><i class="fa fa-pencil-square-o"></i> View previous notes</button>
          </form>
        </div>
        <div class="row">
          <participant class="one-half column participant-row" *ngFor="let external of meeting.externals" [external]="external" (click)="myModal.open()" ></participant>
          <modal  #myModal
              title=""
              modalClass="modal-large"
              [hideCloseButton]="false"
              [closeOnEscape]="true"
              [closeOnOutsideClick]="true">

          <modal-header>
              Modal header content goes there.
          </modal-header>

          <modal-content>
              Modal body content goes there.
          </modal-content>

          <modal-footer>
              Modal footer content goes there.
          </modal-footer>

      </modal>
        </div>
      </div>
    </div>

  </main>
  `,
    styleUrls: ['../dist/assets/css/meeting-details.css']
})

export class MeetingDetailsComponent {

    private meeting: any = {};
    private meetingId: string;
    private sub: any;
    private now: Date;
    private tomorrow: Date;

    constructor(private route: ActivatedRoute, private meetingService: MeetingService) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.meetingId = params['id']; // (+) converts string 'id' to a number
        });

        //TODO: Load the meeting detail using MeetingService
        this.meeting = this.meetingService.getMeeting(this.meetingId);

        this.now = new Date();
        this.tomorrow = new Date();
        this.tomorrow.setDate(this.tomorrow.getDate() + 1);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
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
