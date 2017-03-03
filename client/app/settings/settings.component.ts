import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms'
import { UserService } from '../shared/services/user.service';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'settings-page',
  template: `
  <feedback *ngIf="notificationShown"></feedback>
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
                    <form #user="ngForm" (ngSubmit)="saveUserData(user.value)">
                        <input type="text" id="first-name" placeholder="First name" [value]="userData.fname" name="fname" ngModel/>
                        <input type="text" id="last-name" placeholder="Last name" [value]="userData.lname" name="lname" ngModel/>
                        <input type="email" id="email" placeholder="Email" [value]="userData.email" name="email" ngModel/>
                        <button type="submit"><i class="fa fa-floppy-o"></i> Save changes</button>
                        <a href="#" class="form-instruction float-left">Change password</a>
                        <a href="#" class="form-instruction float-right dangerous" (click)="deleteAccount()">Delete account</a>
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
  </main>
  `,
  styleUrls: ['../dist/assets/css/settings.css']
})

export class SettingsComponent {

  integrationsCallback = "settings";
  private calendars;
  public userData = {fname:"", lname: "", email:""};
  public checkboxes = [];
  private notificationShown = false;
  private name;
  private calendarError:string;

  constructor(private userService: UserService, private router: Router, private authenticationService:AuthenticationService ) { }

  ngOnInit() {
    this.authenticationService.requestUserData()
        .subscribe(data => {
          this.userData = data;
          this.name = data.fname + " " + data.lname;
    });
    this.userService.getCalendars()
      .subscribe(data => {
        this.calendars = data.calendars;

        this.userService.getCurrentCalendars()
          .subscribe(data => {
            for (let cal of this.calendars) {
              let isChecked = "";
              if(data.calendars && data.calendars.includes(cal.id)) {
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
            }
          });
      },
      error => {
        // Display the error
        this.calendarError = error;
      });
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

  saveUserData(user) {
    if(user.fname.trim().length > 0) {
      this.userData.fname = user.fname;
    }
    if(user.lname.trim().length > 0) {
      this.userData.lname = user.lname;
    }
    if(user.email.trim().length > 0) {
      this.userData.email = user.email;
    }
    this.authenticationService.updateUserData(this.userData)
      .subscribe(data => {
        // Show a notification with timeout
        this.showNotification();

        this.authenticationService.updateEmployee(this.userData);
        this.name = this.userData.fname + " " + this.userData.lname;

        // Route to private dashboard
        this.router.navigate(['/settings']);
      },
      error => console.error(error));
  }

  showNotification(){
    this.notificationShown = true;
    setTimeout(() => {
      this.notificationShown = false;
    }, 4000);
  }

  deleteAccount() {
    if(confirm("Are you sure you want to delete your account?") && confirm("100%?") && confirm("It will be gone forever, sure you wanna do it?")) {
      this.authenticationService.deleteAccount()
      .subscribe(data => {
        // Router back to landing page
        this.router.navigate(['/']);
      });
    }
  }

}
