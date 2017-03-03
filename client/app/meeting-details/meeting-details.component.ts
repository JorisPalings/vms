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
    <h1>Meeting</h1>
    <profile></profile>
  </header>
  <main>
    <div class="container">
      <div class="row">
        <h2>{{meeting.summary}}</h2>
        <h3>{{meeting.start}} {{meeting.end}}</h3>
        <h3>{{meeting.room}}</h3>
        <p >{{meeting.description || 'No description has been set for this meeting.'}}</p>

        <div class="one-half column offset-by-three">
          <form>
            <button><i class="fa fa-pencil-square-o"></i> View previous notes</button>
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

    constructor(private route: ActivatedRoute, private meetingService: MeetingService) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.meetingId = params['id']; // (+) converts string 'id' to a number
        });

        //TODO: Load the meeting detail using MeetingService
        this.meeting = this.meetingService.getMeeting(this.meetingId);
    }

    showParticipant(external: any) {

    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
