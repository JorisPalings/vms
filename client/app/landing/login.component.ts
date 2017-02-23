import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

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
    <form *ngIf="!submitted" #login="ngForm" novalidate (ngSubmit)="doLogin(login.value, login.valid)">
    <!--show error only when field is not valid & it's dirty or form submited-->
        <small *ngIf="mail.invalid || (!mail.pristine && login.submitted)">
            E-mail is required.
        </small>

        <input type="email" name="mail" [(ngModel)]="loginUser.mail" #mail="ngModel" required placeholder="EMAIL" autofocus />

        <small [hidden]="password.valid || (password.pristine && !login.submitted)">
            Password is required.
        </small>

        <input type="password" placeholder="PASSWORD" name="password" [(ngModel)]="loginUser.password" #password="ngModel" required />

        <span class="form-instruction"><a href="#">Forgot your password?</a></span>

        <button type="submit" [disabled]="!login.valid">LOG IN</button>
        <span class="form-instruction">Need an account? <a href="#">Register</a></span>
    </form>
  </div>
  `,
  styleUrls: ['../dist/assets/css/login-form.css']
})

export class LoginComponent implements OnInit {
  submitted: boolean = false; // check if form is submitted

  constructor(private http: Http, public loginUser: Credentials) {}

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

    // Setting the header, telling the express API we are sending json
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.submitted = true;

    //Check if the credentials entered are valid
    if (isValid) {
      console.log('Request sent', this.loginUser);
       this.http.post('http://localhost:3000/api/login', JSON.stringify(this.loginUser), { headers: headers }).subscribe(err => console.log(err));
    }
  }

}
