import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Meeting } from '../_models/meeting';
import { ActivatedRoute } from '@angular/router';
import { MeetingService } from '../shared/services/meeting.service';
import { AuthenticationService } from '../shared/services/authentication.service';
import { UserService } from '../shared/services/user.service';
import { ModalModule } from 'ngx-modal';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { EmailValidator } from '../directives/mail-validator';

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
    <div class="loading container" *ngIf="loading">
        <img src="../dist/assets/images/crafty-much-pretty.png"/>
        <h3>Loading ...</h3>
    </div>
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
            <button type="submit" (click)="noteModal.open(); importNote();"><i class="fa fa-pencil-square-o"></i> Take notes</button>
          </form>
        </div>
        <div class="row">
          <participant class="one-half column participant-row" *ngFor="let external of externals" [external]="external" (click)="myModal.open(); setExternal(external);" ></participant>
        </div>
      </div>
    </div>
    <modal  #noteModal
            title=""
            class="modal-large"
            [hideCloseButton]="true"
            [closeOnEscape]="true"
            [closeOnOutsideClick]="true">

        <modal-header>
            <h1>Note</h1>
            <button (click)="noteModal.close()" class="close"><i class="fa fa-times" aria-hidden="true"></i></button>
        </modal-header>

        <modal-content class="user-details">
          <form (submit)="saveNotes()" [formGroup]="noteForm">
            <textarea [formControl]="noteForm.controls['content']" name="content"></textarea>
            <button type="submit">Save notes</button>
          </form>
        </modal-content>
    </modal>
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

        <modal-content class="user-details">
          <button  [ngClass]="{'toggleIsDisabled': !isUserEditable}" class="toggle-button" (click)="toggleFieldsEditable()"><i class="fa fa-pencil"></i> Edit fields</button>
          <form class="container" [formGroup]="externalForm">
            <table>
                <tr>
                    <td>Phone: </td>
                    <td>
                      <input placeholder="Phone" [disabled]="!isUserEditable" type="text" [formControl]="externalForm.controls['phone']" name="phone" value="{{external.phone}}">
                    </td>
                </tr>
                <tr>
                    <td>Email: </td>
                    <td>
                      <input [formControl]="externalForm.controls['mail']" placeholder="Email" [disabled]="!isUserEditable" type="text" name="email" value="{{external.email}}">
                    </td>
                </tr>
                <tr>
                    <td>Company: </td>
                    <td>
                      <input [formControl]="externalForm.controls['company']" placeholder="Company" [disabled]="!isUserEditable" type="text" name="company" value="{{external.company}}">
                    </td>
                </tr>
            </table>
            <button *ngIf="isUserEditable" type="submit">Save data</button>
          </form>
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
    public isUserEditable = false;
    private externalForm: FormGroup;
    private loading = true;
   	private noteForm: FormGroup;
    private note:any;
    private hadNotesBefore = false;

    constructor(private route: ActivatedRoute, private meetingService: MeetingService, private userService: UserService, private fb:FormBuilder, private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.externalForm = this.fb.group({
          company: [null, Validators.required],
          phone: [null, Validators.required],
          mail: [null, Validators.compose([Validators.required, EmailValidator.isValidMailFormat])],
        })

        this.noteForm = this.fb.group({
          content: [null, Validators.required]
        })

        this.sub = this.route.params.subscribe(params => {
            this.meetingId = params['id']; // (+) converts string 'id' to a number

            //Load the meeting detail using MeetingService
            this.meetingService.getMeeting(this.meetingId).subscribe(data => {
                this.meeting = data;
                this.loading = false;
            });

            //Load the meeting externals using MeetingService
            this.meetingService.getExternals(this.meetingId).subscribe(data => {
                console.log(data);
                this.externals = data;
                this.loading = false;
            });
        });


        this.now = new Date();
        this.tomorrow = new Date();
        this.tomorrow.setDate(this.tomorrow.getDate() + 1);
    }

    importNote(){
      this.note = {};
      let data = {
        meetingId: this.meetingId
      }
      this.meetingService.getMeetingNotes(data)
        .subscribe(data => {
          console.log("Meeting notes: ", data);
          this.hadNotesBefore = false;
          this.note = this.filterNotes(data);
        })
    }

    saveNotes(){
      let noteId;
      if (this.hadNotesBefore){
        noteId = this.note.id;
      }
      else {
        noteId = "";
      }

      let data = {
        isNew: this.hadNotesBefore,
        noteId: noteId,
        content: this.noteForm.value.content,
        meetingId: this.meetingId,
      }

      this.meetingService.saveNotes(data)
        .subscribe(data => {
          //TODO: Success message
          console.log(data);

        },
        error => {
          //TODO: Error message
        })
    }

    filterNotes(notes){
      console.log("Filtering notes");
      for (let note of notes){
        console.log(note);
        if (note.authorId === this.authenticationService.employee){
          this.hadNotesBefore = true;
          this.noteForm.setValue({
            content: note.content
          })
          this.noteForm.value.content = note.content;
          console.log('Had note before');
          return note;
        }
      }
      return {}
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    toggleFieldsEditable(){
      if (this.isUserEditable){
        this.isUserEditable = false;
      }
      else {
        this.isUserEditable = true;
      }
    }

    saveExternalData(){
      // TODO: Send the data to the userService
      let externalData = {
        id: this.external.id,
        fname: this.external.fname,
        lname: this.external.lname,
        email: this.externalForm.value.mail,
        company: this.externalForm.value.company,
        phone: this.externalForm.value.phone
      }

      this.userService.updateExternal(externalData)
        .subscribe(data => {
          console.log(data);
          // TODO: Success message

          // Update the data locally
          for (var _i = 0; _i < this.externals.length; _i++) {
              if (this.externals[_i].fname === this.external.fname && this.externals[_i].lname === this.external.lname){
                this.external[_i] = this.external;
              }
          }
        },
        error => {
          // TODO: Error message
        })



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
        this.externalForm.value.mail = this.external.email;
        this.externalForm.value.company = this.external.company;
        this.externalForm.value.phone = this.external.phone;

        console.log(external);
    }

}
