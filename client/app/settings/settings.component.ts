import { Component, style, state, animate, transition, trigger, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { UserService } from '../shared/services/user.service';
import { AuthenticationService } from '../shared/services/authentication.service';
import { EmailValidator } from '../directives/mail-validator';

@Component({
  selector: 'settings-page',
  encapsulation: ViewEncapsulation.None,
  template: `
  <feedback *ngIf="notificationShown" [@fadeInOut]></feedback>
  <header class="private-dash-header">
      <branding></branding>
      <div class="title">
        <a routerLink="/private-dashboard"><i class="fa fa-chevron-left"></i></a>
        <h1>Settings</h1>
      </div>
      <profile [name]="name"></profile>
  </header>
  <main>
      <div class="container">
          <div class="row">
              <div class="form five columns">
                  <section>
                    <h2>Profile information</h2>
                    <form [formGroup]="user" (ngSubmit)="saveUserData() ">
                        <div *ngIf="user.controls['firstname'].hasError('required') && user.controls['firstname'].dirty" class="alert alert-danger">You must include a first name.</div>
                        <input type="text" id="first-name" placeholder="First name" name="fname" [formControl]="user.controls['firstname']"/>
                        <div *ngIf="user.controls['lastname'].hasError('required') && user.controls['lastname'].dirty" class="alert alert-danger">You must include a last name.</div>
                        <input type="text" id="last-name" placeholder="Last name"  name="lname" [formControl]="user.controls['lastname']"/>
                        <div *ngIf="user.controls['mail'].hasError('required') && user.controls['mail'].dirty" class="alert alert-danger">You must include an email address.</div>
                        <div *ngIf="user.controls['mail'].hasError('invalidEmailAddress') && user.controls['mail'].touched" class="alert alert-danger">Your email address must be of pattern \"john@doe.com\".</div>
                        <input type="email" id="email" placeholder="Email" name="mail" [formControl]="user.controls['mail']"/>

                        <button [disabled]="!user.valid" type="submit"><i class="fa fa-floppy-o"></i> Save changes</button>
                        <a href="#" class="form-instruction float-left">Change password</a>
                        <p class="form-instruction float-right dangerous underline" (click)="deleteModal.open()">Delete account</p>
                    </form>
                  </section>
              </div>
              <div class="form six columns offset-by-one">
                <section>
                  <h2>Integrations</h2>
                  <integration-buttons [callback]="integrationsCallback"></integration-buttons>
                </section>
                <section>
                  <h2>Calendars</h2>
                  <div *ngIf="calendarError" class="has-errors">
                    <li class="error">
                      {{calendarError}}
                    </li>
                  </div>
                  <div class="loading container" *ngIf="loading">
                      <img src="../dist/assets/images/crafty-much-pretty.png"/>
                      <h3>Loading ...</h3>
                  </div>
                  <form *ngIf="!calendarError" #cals="ngForm" (ngSubmit)="linkCals(cals.value, cals.valid)" class="zebra-form">
                    <fieldset *ngFor="let cal of checkboxes">
                        <input name="calendars" value="{{cal.id}}" type="checkbox" id="cal-{{cal.id}}" checked="{{cal.checked}}" (change)="checkboxClicked(cal)"/>
                        <label for="cal-{{cal.id}}">{{cal.displayOverride || cal.display }}</label>
                    </fieldset>
                    <button type="submit"><i class="fa fa-floppy-o"></i> Save calendars</button>
                  </form>
                </section>
              </div>
          </div>
      </div>
      <modal  #deleteModal
              title=""
              class="modal-small"
              [hideCloseButton]="true"
              [closeOnEscape]="false"
              [closeOnOutsideClick]="false">

          <modal-content class="user-details">
            <p>Are you sure you want to delete your account?<br>This action cannot be reversed!</p>
            <button (click)="deleteAccount()" class="danger-button">Yes!</button>
            <button (click)="deleteModal.close()">No, abort!</button>
          </modal-content>
      </modal>
  </main>
  `,
  styleUrls: ['../dist/assets/css/settings.css'],
  animations: [
      trigger('fadeInOut', [
        transition(':enter', [   // :enter is alias to 'void => *'
          style({opacity:0}),
          animate(250, style({ opacity: 1 }))
        ]),
        transition(':leave', [   // :leave is alias to '* => void'
          animate(250, style({ opacity: 0 }))
        ])
      ])
    ]
})

export class SettingsComponent {

  integrationsCallback = "settings";
  private calendars;
  public checkboxes = [];
  private notificationShown = false;
  private name;
  private calendarError: string;
  private user: FormGroup;
  private loading = true;

  constructor(private userService: UserService, private router: Router, private authenticationService: AuthenticationService, private fb: FormBuilder) { }

  ngOnInit() {
    this.user = this.fb.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      mail: [null, Validators.compose([Validators.required, EmailValidator.isValidMailFormat])]
    })

    if (!this.authenticationService.isAuthenticated()) {
      this.router.navigate(['/']);
    } else {
      this.authenticationService.requestUserData()
        .subscribe(data => {
          this.name = data.fname + " " + data.lname;

          this.user.patchValue({ firstname: data.fname });
          this.user.patchValue({ lastname: data.lname });
          this.user.patchValue({ mail: data.email });

        });
      this.userService.getCalendars()
        .subscribe(data => {
          this.calendars = data.calendars;

          this.userService.getCurrentCalendars()
            .subscribe(data => {
              for (let cal of this.calendars) {
                let isChecked = "";
                if (data.calendars && data.calendars.includes(cal.id)) {
                  isChecked = "checked";
                }
                else {
                  isChecked = "";
                }
                this.checkboxes.push(
                  {
                    display: cal.summary,
                    displayOverride: cal.summaryOverride,
                    id: cal.id,
                    checked: isChecked
                  }
                )
                this.loading = false;
              }
            });
        },
        error => {
          // Display the error
          this.calendarError = error;
        });
    }

  }

  linkCals() {
    this.userService.linkCalendars(this.getSelectedOptions())
      .subscribe(data => {
        this.showNotification();
        // Route to private dashboard
        this.router.navigate(['/settings']);
      },
      error => console.error(error));
  }

  getSelectedOptions() {
    return this.checkboxes
      .filter(cal => cal.checked)
      .map(cal => cal.id)
  }

  checkboxClicked(cal) {
    cal.checked = (cal.checked === "checked") ? "" : "checked";
    this.checkboxes[this.checkboxes.indexOf(cal)] = cal;
  }

  saveUserData() {
    let userData = {
      fname: "",
      lname: "",
      email: ""
    };

    if (this.user.value.firstname.trim().length > 0) {
      userData.fname = this.user.value.firstname;
    }
    if (this.user.value.lastname.trim().length > 0) {
      userData.lname = this.user.value.lastname;
    }
    if (this.user.value.mail.trim().length > 0) {
      userData.email = this.user.value.mail;
    }
    console.log(userData);
    this.authenticationService.updateUserData(userData)
      .subscribe(data => {
        // Show a notification with timeout
        this.showNotification();

        this.authenticationService.updateEmployee(userData);
        this.name = this.user.value.firstname + " " + this.user.value.lastname;

        // Route to private dashboard
        this.router.navigate(['/settings']);
      },
      error => console.error(error));
  }

  showNotification() {
    this.notificationShown = true;
    setTimeout(() => {
      this.notificationShown = false;
    }, 4000);
  }

  deleteAccount() {
    if (confirm("Are you sure you want to delete your account?\nThis action cannot be reversed!")) {
      this.authenticationService.deleteAccount()
        .subscribe(data => {
          // Router back to landing page
          this.router.navigate(['/']);
        });
    }
  }

}
