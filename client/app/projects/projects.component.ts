import { Component, ViewEncapsulation } from '@angular/core';
import { ModalModule } from 'ngx-modal';
import { ProjectService } from '../shared/services/project.service';
import { MeetingService } from '../shared/services/meeting.service';

@Component({
    selector: 'projects',
    encapsulation: ViewEncapsulation.None,
    template: `
    <header class="private-dash-header">
        <branding></branding>
        <div class="title">
          <a routerLink="/private-dashboard"><i class="fa fa-chevron-left"></i></a>
          <h1>Projects</h1>
        </div>
        <profile></profile>
    </header>
    <main>
        <div class="container">
            <div class="row">
                <div class="three columns">
                    <ul class="projects-list">
                        <li *ngFor="let project of projects" class="{{project.id == current ? 'current' : ''}}">
                            <h2>{{project.tag}}</h2>
                        </li>
                    </ul>
                </div>
                <div class="nine columns">
                    <ul class="meetings-list">
                        <li *ngFor="let meeting of meetings" (click)="myModal.open()">
                            <ul class="meeting-item">
                                <li><i class="fa fa-fw fa-calendar"></i>{{processDate(meeting.start)}}, {{meeting.start | date:'HH:mm'}} - {{processDate(meeting.end)}}, {{meeting.end | date:'HH:mm'}}</li>
                                <li><i class="fa fa-fw fa-users"></i><span *ngIf="meeting.externals != 0 || meeting.meetees != 0"><span *ngFor="let external of meeting.externals.length === 0 ? meeting.meetees : meeting.externals; let isLast=last"><span (click)="showMeetings(project.id)">{{external.fname}}</span> {{external.lname}}{{isLast ? '' : ', '}}</span></span><span *ngIf="meeting.externals == 0 && meeting.meetees == 0">Just you</span></li>
                                <li><i class="fa fa-fw fa-folder"></i>{{meeting.summary}}</li>
                            </ul>
                        </li>
                    </ul>
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
                <button (click)="myModal.close()" class="close"><i class="fa fa-times" aria-hidden="true"></i></button>
                <img src="" alt=""><!-- External avatar goes here -->
                <h1>Note</h1>
            </modal-header>

            <modal-content class="notes-details">
                <button [ngClass]="{'toggleIsDisabled': !isNoteEditable}" class="toggle-button" (click)="toggleFieldsEditable()"><i class="fa fa-pencil"></i> Edit notes</button>
                <form class="container">
                    <textarea [disabled]="!isUserEditable" value=""><!-- Value = note.content --></textarea>
                    <button *ngIf="isNoteEditable" type="submit">Save note</button>
                </form>
            </modal-content>
        </modal>
    </main>
    `,
    styleUrls: ['../dist/assets/css/projects.css']
})

export class ProjectsComponent {

    private projects: any[] = [];
    private meetings: any[] = [];
    private now: Date;
    private tomorrow: Date;
    private current: string;
    public isNoteEditable = false;

    constructor(private projectService: ProjectService, private meetingService: MeetingService) {}

    ngOnInit() {
        this.projectService.getAllProjects().subscribe(data => {
            this.projects = data;
            this.showMeetings(this.projects[0].id);
        });
        this.now = new Date();
        this.tomorrow = new Date();
        this.tomorrow.setDate(this.tomorrow.getDate() + 1);
    }

    showMeetings(id: string) {
        this.current = id;
        this.projectService.getMeetingsForProject(id).subscribe(data => {
            this.meetings = data;
            for(var i = 0; i < this.meetings.length; i++) {
                this.addExternals(i);
            }
        });
    }

    addExternals(i: number) {
        this.meetingService.getExternals(this.meetings[i].id).subscribe(data => {
            this.meetings[i].externals = data;
        });
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

    toggleFieldsEditable(){
      if (this.isNoteEditable){
        this.isNoteEditable = false;
      }
      else {
        this.isNoteEditable = true;
      }
    }

}
