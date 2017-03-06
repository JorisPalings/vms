import { Component, ViewEncapsulation } from '@angular/core';
import { ModalModule } from 'ngx-modal';
import { ProjectService } from '../shared/services/project.service';
import { MeetingService } from '../shared/services/meeting.service';
import { AuthenticationService } from '../shared/services/authentication.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

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
        <div *ngIf="errorMessage" class="has-errors container">
            <li class="error">
            {{errorMessage}}
            </li>
        </div>
        <div class="container">
            <div class="loading container" *ngIf="loadingProjects">
                <img src="../dist/assets/images/crafty-much-pretty.png"/>
                <h3>Loading ...</h3>
            </div>
            <div class="row">
                <div class="three columns">
                    <ul class="projects-list">
                        <li *ngFor="let project of projects" class="{{project.id == current ? 'current' : ''}}" (click)="showMeetings(project.id)">
                            <h2>{{project.tag}}</h2>
                        </li>
                    </ul>
                </div>
                <div class="nine columns">
                    <div class="loading container" *ngIf="loadingMeetings">
                        <img src="../dist/assets/images/crafty-much-pretty.png"/>
                        <h3>Loading ...</h3>
                    </div>
                    <ul class="meetings-list">
                        <li *ngFor="let meeting of meetings">
                            <h2>{{meeting.summary}}</h2>
                            <ul class="meeting-item">
                                <li>{{processDate(meeting.start)}}, {{meeting.start | date:'HH:mm'}} - {{processDate(meeting.end)}}, {{meeting.end | date:'HH:mm'}}</li>
                                <li><span *ngIf="meeting.externals != 0 || meeting.meetees != 0"><button (click)="openNotesModal(note); myModal.open();" *ngFor="let note of meeting.notes"><span>{{note.author.fname}}</span> {{note.author.lname}}</button></span><span *ngIf="meeting.externals == 0 && meeting.meetees == 0">Just you</span></li>
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
                <h1>Note</h1>
            </modal-header>

            <modal-content class="notes-details">
                <form [formGroup]="" *ngIf="isModalEditable" class="container" (submit)="saveNotes(activeNote)">
                    <textarea [formControl]="noteForm.controls['content']" value="{{activeNote.content}}"><!-- Value = note.content --></textarea>
                    <button type="submit">Save note</button>
                </form>
                <p *ngIf="!isModalEditable">{{activeNote.content}}</p>
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
    private loadingProjects = true;
    private loadingMeetings = false;
    private isModalEditable = false;
    private activeNote:any = {};
    private noteForm: FormGroup;
    private errorMessage: string;


    constructor(private projectService: ProjectService, private meetingService: MeetingService, private authenticationService: AuthenticationService, private fb: FormBuilder) {}

    ngOnInit() {
        this.noteForm = this.fb.group({
          content: [null, Validators.required]
        })

        this.projectService.getAllProjects().subscribe(data => {
            this.projects = data;
            this.loadingProjects = false;
            this.showMeetings(this.projects[0].id);
        }, error => {
          this.errorMessage = error;
          this.loadingProjects = false;
        });
        this.now = new Date();
        this.tomorrow = new Date();
        this.tomorrow.setDate(this.tomorrow.getDate() + 1);
    }

    saveNotes(note){

      let data = {
        isNew: false,
        noteId: this.activeNote.id,
        content: this.noteForm.value.content,
        meetingId: note.meetingId
      }

      this.meetingService.saveNotes(data)
        .subscribe(data => {
          //TODO: Success message
          console.log(data);

        },
        error => {
          this.errorMessage = error;
        })
    }

    openNotesModal(note){
      console.log(note);
      this.activeNote = note;
      // Check if the owner of the notes is the user logged in

      if (note.authorId === this.authenticationService.employee){
        // If logged in user show the editable modal
        this.isModalEditable = true;
      }
      // If other employee show the normal modal with text display

    }

    showMeetings(id: string) {
        this.loadingMeetings = true;
        this.meetings = [];
        this.current = id;
        this.projectService.getNotesForMeetingForProject(id).subscribe(data => {
            console.log(data);
            console.log(data.project.meetings);
            setTimeout(() => {
                this.loadingMeetings = false;
                this.meetings = data.project.meetings;
                this.sortMeetings();
                console.log(this.meetings);
            }, 300);
        }, error => {
            this.errorMessage = error;
            this.loadingMeetings = false;
        });
    }

    sortMeetings(){
      this.meetings.sort(function(a, b) {
          return +new Date(a.start) - +new Date(b.start);
      });
    }

    addExternals(i: number) {
        this.meetingService.getExternals(this.meetings[i].id).subscribe(data => {
            this.meetings[i].externals = data;
        }, error => {
            this.errorMessage = error;
            this.loadingMeetings = false;
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
