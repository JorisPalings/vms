import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthenticationService } from '../shared/services/authentication.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

// RxJS operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

export class Credentials {
  mail: string;
  password: string;
}

@Component({
  selector: 'login-form',
  providers: [Credentials],
  template: `
  <div class="form">
    <h1 class="form-title">Login</h1>
    <div *ngIf="submitted">
      <p>Your form has been submitted.</p>
    </div>
    <div *ngIf="errors" class="has-errors">
      <li *ngFor="let error of errors" class="error">
        {{error}}
      </li>
    </div>
    <form *ngIf="!submitted" #login="ngForm" novalidate (ngSubmit)="doLogin(login.value, login.valid)">
        <small *ngIf="mail.errors && (mail.dirty || mail.touched)" class="dangerous">
            E-mail is required.
        </small>
        <input type="email" name="mail" [(ngModel)]="loginUser.mail" #mail="ngModel" required placeholder="Email" autofocus />

        <small *ngIf="password.errors && (password.dirty || password.touched)" class="dangerous">
            Password is required.
        </small>
        <input type="password" placeholder="Password" name="password" [(ngModel)]="loginUser.password" #password="ngModel" required />
        <span class="form-instruction float-right"><a href="#">Forgot your password?</a></span>

        <button type="submit" [disabled]="!login.valid">Log in</button>
        <span class="form-instruction float-right">Need an account? <a routerLink="/register">Register</a></span>
    </form>
  </div>
  `,
  styleUrls: ['../dist/assets/css/login-form.css']
})

export class LoginComponent implements OnInit {
  submitted: boolean = false; // check if form is submitted

  constructor(private router: Router, private authenticationService: AuthenticationService, public loginUser: Credentials) {}

  private errors: string[];

  ngOnInit() {
    // Initialize the model
    this.loginUser = {
      mail: '',
      password: ''
    }
  }

  doLogin(credentials: Credentials, isValid: boolean){
    // Check if model is valid
    // if valid, call API (express) to login with credentials

    //Check if the credentials entered are valid
    if (isValid) {

      this.authenticationService.login(credentials)
        .subscribe(
          success => {
            if (success){

              this.submitted = true;

              // Log in was successfull
              this.router.navigate(['/private-dashboard']);
            }
          }
          ,
          err => {
            console.log("error occured! ", err);
            // show an error message
            this.errors = [];
            this.errors.push(err);
          });

    }
  }

}
