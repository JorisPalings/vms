import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Meeting } from '../_models/meeting';
import { ActivatedRoute } from '@angular/router';
import { MeetingService } from '../shared/services/meeting.service';
import { ModalModule } from 'ngx-modal';

@Component({
    selector: 'meeting-details',
    encapsulation: ViewEncapsulation.None,
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
        <h2>{{meeting.summary}}</h2>
        <h3>{{processDate(meeting.start)}}, {{meeting.start | date:'HH:mm'}} - {{processDate(meeting.end)}}, {{meeting.end | date:'HH:mm'}}</h3>
        <h3>{{meeting.room}}</h3>
        <p >{{meeting.description || 'No description has been set for this meeting.'}}</p>

      <div class="row">
        <div class="one-half column">
          <form>
            <button type="submit" routerLink="/projects"><i class="fa fa-eye"></i> View previous notes</button>
          </form>
        </div>
        <div class="one-half column">
          <form>
            <button type="submit" routerLink="/projects"><i class="fa fa-pencil-square-o"></i> Take notes</button>
          </form>
        </div>
        <div class="row">
          <participant class="one-half column participant-row" *ngFor="let external of externals" [external]="external" (click)="myModal.open(); setExternal(external);" ></participant>
        </div>
      </div>
    </div>
    <modal  #myModal
            title=""
            class="modal-large"
            [hideCloseButton]="true"
            [closeOnEscape]="true"
            [closeOnOutsideClick]="true">

        <modal-header>
            <img src="{{external.pictureURL}}" alt="{{external.fname}} {{external.lname}}">
            <h1>{{external.fname}} {{external.lname}}</h1>
            <button (click)="myModal.close()" class="close"><i class="fa fa-times" aria-hidden="true"></i></button>
        </modal-header>

        <modal-content>
            <table>
                <tr>
                    <td></td>
                    <td></td>
                </tr>
            </table>
        </modal-content>
    </modal>
  </main>
  `,
    styleUrls: ['../dist/assets/css/meeting-details.css']
})

export class MeetingDetailsComponent {

    private meeting: any = {};
    private meetingId: string;
    private externals: any[] = [];
    private sub: any;
    private now: Date;
    private tomorrow: Date;
    private external: any = {};

    constructor(private route: ActivatedRoute, private meetingService: MeetingService) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.meetingId = params['id']; // (+) converts string 'id' to a number

            //Load the meeting detail using MeetingService
            this.meetingService.getMeeting(this.meetingId).subscribe(data => {
                this.meeting = data;
            });

            //Load the meeting externals using MeetingService
            this.meetingService.getExternals(this.meetingId).subscribe(data => {
                console.log(data);
                this.externals = data;
            });
        });


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

    setExternal(external: any) {
        this.external = external;
        console.log(external);
    }

}
